import { sendRequest } from '../utils/sendRequest';
import { URLS } from '../utils/constants';
import { Psm } from './Psm';
import { error, debug } from '../utils/logger';
import { hydratePayload } from '../utils/hydratePayload';
import { PayloadCore, InbrainMetrics } from '../interfaces';
import { cookie } from '@turnercode/cdp-cookie';

const surveyStorageID = 'inbrain-surveys';
const win = window as any;
const doc = document as any;
const promoLoadedEventsSent = [];
const promoVisibleEventsSent = [];
const carouselDefaultConfig = {
  watchSlidesProgress: true,
  slidesPerView: 'auto',
  spaceBetween: 20,
  navigation: {
    nextEl: '.inbrain-control-next',
    prevEl: '.inbrain-control-prev',
  },
};
let core: PayloadCore;
let inbrainMetrics: InbrainMetrics;
let surveyFlag = false;

export async function initInbrain(psm: Psm, payloadCore: PayloadCore) {
  // grab the environment from prism
  const env = psm.config.psmEnvironment.toUpperCase();
  core = payloadCore;

  // Check if inbrain is disabled and optimizely isn't in control
  if (!psm.queryFlag('inbrain') && !win.optimizelyInControlOfInBrain) {
    return;
  }

  // Checks if optimizely is in control of inbrain and inbrain is enabled by optimizely
  if (win.optimizelyInControlOfInBrain && !win.optimizelyInBrainEnabled) {
    return;
  }

  // Ensure inbrain doesn't load outside of the US
  if (psm.wmukid == 'Unknown') {
    return;
  }

  const surveyOverride = win.location.search.search(/[?&]surveyOverride=[1t]/) !== -1;
  surveyFlag = surveyOverride ? true : psm.queryFlag('inBrainSurvey') ? true : false;

  log('INBRAIN v2.0.5');

  const localhost = win.location.search.search(/[?&]localhost=[1t]/) !== -1;
  const inbrainURL = localhost ? URLS.inbrain['LOCAL'] : URLS.inbrain[env];

  let response = null;
  try {
    response = await sendRequest(inbrainURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(getContentURL(psm, 'true')),
    });
  } catch (err) {
    error({
      err,
      eventType: 'inbrain',
      methodName: 'initInbrain',
    });
    return;
  }

  if (!response) {
    console.log('no render response');
    return;
  }

  // eslint-disable-next-line prefer-const
  let { domain, pages, target, survey } = response;

  // make sure domain and page matches the promo
  if (!shouldRender({ domain, pages })) {
    return;
  }

  initCarouselListener({ psm, env, target, inbrainURL, response });
  initSurveys({ survey, psm, env });
}

function initCarouselListener({ psm, env, target, inbrainURL, response }) {
  // Adds a listener to load the carousel after scrolling
  // Hardcoded for now...
  new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log('found ya crossing over did I?');
          // wait until target element exists in the DOM
          elementReady(target).then(async () => {
            try {
              // grab inbrain promo content for this domain from the CDN
              response = await sendRequest(inbrainURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(getContentURL(psm, 'false')),
              });
            } catch (err) {
              error({
                err,
                eventType: 'inbrain',
                methodName: 'initInbrain',
              });
              return;
            }

            // eslint-disable-next-line prefer-const
            let { target, placement, html, carousel } = response;

            let renderedHTML;
            try {
              renderedHTML = decodeURIComponent(html);
            } catch (err) {
              error({
                err,
                eventType: 'inbrain',
                methodName: 'initInbrainV2',
              });
              return;
            }

            switch (placement) {
              case 'within':
                doc.querySelector(target).innerHTML = renderedHTML;
                break;
              case 'before':
                doc.querySelector(target).insertAdjacentHTML('beforebegin', renderedHTML);
                break;
              case 'after':
                doc.querySelector(target).insertAdjacentHTML('afterend', renderedHTML);
                break;
            }

            // Initializes the carousel.
            initCarousel(carousel).then(() => {
              // Send off impression events for promos loaded into the carousel.
              sendPromoLoadedEvents({ psm, env });

              // listen for the user to click the carousel scroll button then send
              // viewable impressions for the promos in the carousel, but only for
              // promos that haven't sent viewable impression
              win.inbrainCarousel.on('slideChange', function () {
                sendPromoLoadedEvents({ psm, env });
                sendPromoVisibleEvents({ psm, env });
              });

              window.document.addEventListener('resize', () => {
                sendPromoLoadedEvents({ psm, env });
              });

              // Send inbrain viewed events once a promo item is more than 50% in the viewport
              // for at least 1 second.
              new IntersectionObserver(
                (entries, observer) => {
                  entries.forEach((entry) => {
                    if (entry.isIntersecting || entry.intersectionRatio >= 0.9) {
                      sendPromoVisibleEvents({ psm, env });
                      observer.disconnect();
                    }
                  });
                },
                {
                  root: null,
                  rootMargin: '0px',
                  threshold: [0.5, 1.0],
                }
              ).observe(doc.querySelector('.inbrain-container'));
            });

            // Attach click event listeners to all promos.
            grabAllPromos().forEach((elem) => {
              const id = elem.dataset.inbrain;
              const promoPosition = elem.dataset.slotindex;
              const destinationURL = elem.href;

              elem.addEventListener('click', () => {
                setInbrainMetrics({ psm, id, promoPosition, destinationURL });
                hydratePayload(psm, core);
                core.trackInbrain('Inbrain Click', new Date().toISOString(), (data) => {
                  sendEvent({
                    env,
                    data,
                  });

                  if (env === 'AUTOMATED_TEST') {
                    win.localStorage.setItem('Inbrain-Click', JSON.stringify(data));
                  }
                });
              });
            });
          });
          observer.disconnect();
        }
      });
    },
    {
      root: null,
      rootMargin: '250px',
    }
  ).observe(doc.querySelector(target));
}

function initSurveys({ survey, psm, env }) {
  // survey.surveys is an array for future proofing
  // for now we just grab the first survey in the array
  const surveyID = survey && survey.surveys && survey.surveys[0];
  // retrieve survey storage object used to store all survey metadata
  const surveyStorage = JSON.parse(localStorage.getItem(surveyStorageID)) || {};

  // eslint-disable-next-line no-prototype-builtins
  if (!surveyStorage || !surveyStorage.hasOwnProperty(surveyID)) {
    surveyStorage[surveyID] = {
      timesViewed: '0',
      answered: 'false',
      choice: '',
      doNotShowAgain: 'false',
    };
  }

  if (localStorage.getItem('inbrain-do-not-show-surveys') == 'true') {
    surveyFlag = false;
  }

  // Insert Survey
  if (surveyFlag && survey && survey.html !== '' && surveyStorage[surveyID].answered == 'false') {
    const surveyQuestion = survey.question;
    const surveyTarget = survey.target;
    elementReady(surveyTarget).then(() => {
      let renderedHTML;

      try {
        renderedHTML = decodeURIComponent(survey.html);
      } catch (err) {
        error({
          err,
          eventType: 'inbrain',
          methodName: 'initInbrainV2',
        });
        return;
      }

      switch (survey.placement) {
        case 'within':
          doc.querySelector(surveyTarget).innerHTML = renderedHTML;
          break;
        case 'before':
          doc.querySelector(surveyTarget).insertAdjacentHTML('beforebegin', renderedHTML);
          break;
        case 'after':
          doc.querySelector(surveyTarget).insertAdjacentHTML('afterend', renderedHTML);
          break;
      }
      surveyStorage[surveyID].timesViewed = (parseInt(surveyStorage[surveyID].timesViewed) + 1).toString();
      localStorage.setItem(surveyStorageID, JSON.stringify(surveyStorage));

      sendSurveyVisbleEvent({ psm, env, surveyID, surveyQuestion });

      // Add Click Listener
      const surveyElement = getSurveyElement();
      const spanElement = document.querySelector('.inbrain-survey-container span');

      function updateDisplay() {
        surveyElement.style.display = 'none';
      }
      spanElement.addEventListener('click', updateDisplay);

      const submitBtn = document.getElementById('survey-submit-btn');

      // If survey does not have a submit button
      if (!submitBtn) {
        document.querySelectorAll('.survey-choice-wrapper').forEach((elem: Element) => {
          elem.addEventListener('click', () => {
            const response = [];
            const input = elem.firstElementChild as HTMLInputElement;
            response.push(input.value);
            sendSurveyAnswerEvent({ psm, env }, surveyQuestion, response, surveyID);
            updateDisplay();

            surveyStorage[surveyID].answered = 'true';
            surveyStorage[surveyID].choice = response.toString();
            localStorage.setItem(surveyStorageID, JSON.stringify(surveyStorage));
          });
        });
      }

      // Submit Button
      // eslint-disable-next-line no-inner-declarations
      function submit() {
        const response = [];
        const surveyQuestion = document.querySelector('.survey-question').innerHTML;
        const inputElem = document.querySelector('.inbrain-survey-body input');
        const nameAttr = inputElem.getAttribute('name');
        const inputs = document.getElementsByName(nameAttr);

        const inputArr = Array.from(inputs);

        for (let i = 0; i < inputArr.length; i++) {
          const input = inputArr[i] as HTMLInputElement;
          if (input.type == 'checkbox' || input.type == 'radio') {
            if (input.checked) {
              response.push(input.value);
            }
          } else {
            response.push(input.value);
          }
        }

        sendSurveyAnswerEvent({ psm, env }, surveyQuestion, response, surveyID);

        updateDisplay();

        surveyStorage[surveyID].answered = 'true';
        surveyStorage[surveyID].choice = response.toString();
        localStorage.setItem(surveyStorageID, JSON.stringify(surveyStorage));
      }

      const doNotShowSurveyAgainBtn = document.getElementById('do-not-show-survey-again');
      doNotShowSurveyAgainBtn.addEventListener('click', () => {
        // leverage view capping to opt the user out of ever seeing
        // the survey again by setting the survey view count to 10,000
        surveyStorage[surveyID].doNotShowAgain = 'true';
        localStorage.setItem(surveyStorageID, JSON.stringify(surveyStorage));
        updateDisplay();
      });
      submitBtn.addEventListener('click', submit);

      const doNotShowBtn = document.getElementById('survey-do-not-show-btn');
      doNotShowBtn.addEventListener('click', () => {
        localStorage.setItem('inbrain-do-not-show-surveys', 'true');
        updateDisplay();
      });
    });
  }
}

// Utility method for logs.
const log = (...args: string[]) => {
  if (window.location.search.search(/[?&]wmpsm_debug=[1t]/) !== -1) {
    // console.log('[PSM]:', ...args);
  }
};

// Utility method to make requests.
function sendEvent(options) {
  const { env, data } = options;

  try {
    sendRequest(URLS.identity[env], {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch (err) {
    debug({
      err,
      eventType: 'inbrain',
      methodName: 'sendEvent',
    });
  }
}

// Checks to see if the promo should render into the page.
function shouldRender({ domain, pages }) {
  // Checks for a domain match
  if (window.location.hostname != domain) {
    return false;
  }

  // Checks for a page path match allowing wildcards
  const matches: boolean[] = [];

  try {
    pages.forEach((path) => {
      const splitPathForPromo = path.split('/');
      const splitPathFromWindow = window.location.pathname.split('/');

      let pathMatch = true;
      splitPathFromWindow.forEach((pathitem, index) => {
        if (splitPathForPromo[index] != '*') {
          if (splitPathForPromo[index] != pathitem) {
            pathMatch = false;
          }
        }
      });
      matches.push(pathMatch);
    });
  } catch (err) {
    error({
      err,
      eventType: 'inbrain',
      methodName: 'shouldRender',
    });
    return false;
  }

  return matches.indexOf(true) != -1;
}

// Wait for an element that satisfies a DOM selector to exist, then resolve with the element.
function elementReady(selector: string): Promise<Element> {
  return new Promise((resolve) => {
    let elem = doc.querySelector(selector);

    if (elem) {
      resolve(elem);
    }

    new MutationObserver((_, observer) => {
      elem = doc.querySelector(selector);

      if (elem) {
        resolve(elem);
        observer.disconnect();
      }
    }).observe(doc.documentElement, {
      childList: true,
      subtree: true,
    });
  });
}

// Initializes the swiper carousel.
function initCarousel(config) {
  config = config || carouselDefaultConfig;
  config.watchSlidesProgress = true;
  config.slidesPerView = 'auto';

  return new Promise((resolve) => {
    const swiperStyles = doc.createElement('link');
    swiperStyles.type = 'text/css';
    swiperStyles.rel = 'stylesheet';
    swiperStyles.href = URLS.lightningOrigin + URLS.carouselStyles;
    // const s = doc.head.getElementsByTagName('link')[0];

    // if (s && s.parentElement) {
    //   s.parentElement.insertBefore(swiperStyles, s);
    // } else {
    doc.head.appendChild(swiperStyles);
    // }

    const swiperScript = doc.createElement('script');
    swiperScript.type = 'text/javascript';
    swiperScript.src = URLS.lightningOrigin + URLS.carouselScript;
    swiperScript.addEventListener('load', () => {
      // @ts-ignore
      win.inbrainCarousel = new Swiper('.inbrain-carousel', config);

      resolve(true);
    });
    doc.head.appendChild(swiperScript);
  });
}

// Grabs the correct promo content URL and adds in needed params.
function getContentURL(psm, initialRequest = 'false') {
  const wmhhid = cookie.get('wmhhid') as any;
  const usp = cookie.get('usprivacy') as string;
  const location = psm.getLocationProperties();
  const device = psm.getDeviceProperties();
  const ids = psm.getIds();
  const brand = psm.getBrand();
  const flags = psm.getFlags();
  const surveyStorage = JSON.parse(localStorage.getItem(surveyStorageID)) || {};

  const inbrainData = {
    wmukid: psm.wmukid as string,
    cdpid: psm.getCDPID(),
    url: window.location.href,
    usp: usp,
    betaTemplate: psm.queryFlag('inBrainTemplateBeta') ? 'true' : 'false',
    betaRecommendations: psm.queryFlag('inBrainRecommendationsBeta') ? 'true' : 'false',
    deviceType: device.type,
    location: location.state,
    language: location.language,
    ecid: ids.ecid,
    kruxid: ids.kruxid,
    brand: brand,
    wmhhid: wmhhid,
    surveyStorage,
    flags: flags,
    initialRequest,
  };

  return inbrainData;
}

function setInbrainMetrics(options) {
  const { psm, id, promoPosition, destinationURL, surveyQuestion, surveyResponse, surveyChoices, surveyID } = options;
  inbrainMetrics = {
    id,
    promoPosition,
    destinationURL,
    surveyQuestion,
    surveyResponse,
    surveyChoices,
    surveyID,
    featureFlagValues: psm.getFlags(),
  };
}

export function getInbrainMetrics(): InbrainMetrics {
  return inbrainMetrics;
}

// Grabs all promos loaded into the carousel.
function grabCarouselPromos(grabIDs = false) {
  let elements = document.querySelectorAll('.swiper-slide-visible > div > a') as NodeListOf<HTMLAnchorElement>;
  if (!elements.length) {
    elements = document.querySelectorAll('.inbrain-promo-inner > a');
  }
  if (grabIDs) {
    const elementIDs = [];
    elements.forEach((el) => {
      elementIDs.push(el.dataset.inbrain);
    });
    return elementIDs;
  }
  return elements;
}

// Grabs all promos, regardless of whether or not they are in the carousel.
function grabAllPromos() {
  return document.querySelectorAll('[data-inbrain]') as NodeListOf<HTMLAnchorElement>;
}

// Utility method to send all promo loaded events.
function sendPromoLoadedEvents({ psm, env }) {
  grabCarouselPromos().forEach((elem) => {
    const id = elem.dataset.inbrain;

    if (!promoLoadedEventsSent.includes(id)) {
      setInbrainMetrics({ psm, id });
      hydratePayload(psm, core);
      core.trackInbrain('Inbrain Promo Loaded', new Date().toISOString(), (data) => {
        sendEvent({
          env,
          data,
        });
        if (env === 'AUTOMATED_TEST') {
          win.localStorage.setItem('Inbrain-Promo-Loaded', JSON.stringify(data));
        }
      });
      promoLoadedEventsSent.push(id);
    }
  });
}

// Utility method to send all promo visible events.
function sendPromoVisibleEvents({ psm, env }) {
  grabCarouselPromos().forEach((elem) => {
    const id = elem.dataset.inbrain;

    if (!promoVisibleEventsSent.includes(id)) {
      setInbrainMetrics({ psm, id });
      hydratePayload(psm, core);
      core.trackInbrain('Inbrain Promo Visible', new Date().toISOString(), (data) => {
        sendEvent({
          env,
          data,
        });
        if (env === 'AUTOMATED_TEST') {
          win.localStorage.setItem('Inbrain-Promo-Visible', JSON.stringify(data));
        }
      });
      promoVisibleEventsSent.push(id);
    }
  });
}

// Retrieve the survey element
function getSurveyElement() {
  return doc.getElementById('inbrain-survey');
}

function getSurveyChoices() {
  const rawChoices = document.querySelectorAll('.survey-answer');
  const choices = [];
  rawChoices.forEach((choice: any) => {
    choices.push(choice.innerHTML);
  });
  return choices;
}

// Send event when survey is loaded and visible on the window
function sendSurveyVisbleEvent({ psm, env, surveyID, surveyQuestion }) {
  const survey = getSurveyElement();

  const id = survey.dataset.survey;
  setInbrainMetrics({ psm, id, surveyID, surveyQuestion });
  hydratePayload(psm, core);
  core.trackInbrain('Inbrain Survey Visible', new Date().toISOString(), (data) => {
    sendEvent({
      env,
      data,
    });
  });
}

function sendSurveyAnswerEvent({ psm, env }, surveyQuestion, surveyResponse, surveyID) {
  const survey = getSurveyElement();
  const surveyChoices = getSurveyChoices();

  const id = survey.dataset.survey;
  setInbrainMetrics({ psm, id, surveyQuestion, surveyResponse, surveyChoices, surveyID });
  hydratePayload(psm, core);
  core.trackInbrain('Inbrain Survey Response', new Date().toISOString(), (data) => {
    sendEvent({
      env,
      data,
    });
  });
}
