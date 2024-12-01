export function getDateDaysFromNow(days: number): Date {
  const now = new Date();
  return new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
}
