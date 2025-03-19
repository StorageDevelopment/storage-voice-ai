import { v4 as uuidv4 } from 'uuid';

export function getDateDaysFromNow(days: number): Date {
  const now = new Date();
  return new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
}

export const generateUniqueInteger = (): number => {
  const uuid = uuidv4();
  const hash = uuid.split('-').join(''); // Remove dashes
  return parseInt(hash.substring(0, 12), 16); // Convert a portion to an integer
};
