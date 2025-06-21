import { v4 as uuidv4 } from 'uuid';
import { formatInTimeZone } from "date-fns-tz";

export function getDateDaysFromNow(days: number): Date {
  const now = new Date();
  return new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
}

export const generateUniqueInteger = (): number => {
  const uuid = uuidv4();
  const hash = uuid.split('-').join(''); // Remove dashes
  return parseInt(hash.substring(0, 12), 16); // Convert a portion to an integer
};

export function formatDate(utcDateStr: string, timezone: string, format: string): string {
  return formatInTimeZone(new Date(utcDateStr), timezone, format);
};

export class Stack {

  items: any[];

  constructor() {
    this.items = []; 
  }

  // Push operation
  push(element: any) {
    this.items.push(element);
  }

  // Pop operation
  pop() {
    if (this.isEmpty()) {
      return "Stack is empty"; 
    }
    return this.items.pop();
  }

  // Peek operation
  peek() {
    if (this.isEmpty()) {
      return "Stack is empty"; 
    }
    return this.items[this.items.length - 1];
  }

  // isEmpty operation
  isEmpty() {
    return this.items.length === 0;
  }

  // Size operation
  size() {
    return this.items.length;
  }

  // Print the stack 
  print() {
    console.log(this.items);
  }
}

