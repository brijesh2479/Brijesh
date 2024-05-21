import { v4 as uuidv4 } from 'uuid';

export function isEnvNode(): boolean {
  try {
    return typeof process !== 'undefined' && typeof process.versions.node !== 'undefined';
  } catch (error) {
    return false;
  }
}

export function generateUUID(): string {
  return uuidv4();
}
