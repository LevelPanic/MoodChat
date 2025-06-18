import { ParsedTask, TaskWithPriority } from '@/types';
import moment from 'moment';
import { Dimensions } from 'react-native';
moment.locale('en-US'); // Set locale for formatting (optional)

export function capitalizeFirstLetter(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function classifyPriority(task: ParsedTask): TaskWithPriority['priority'] {
  if (!task.due) return 'backlog';

  const [dd, mm, yyyy] = task.due.split('-').map(Number);
  const due = new Date(yyyy, mm - 1, dd);
  const now = new Date();
  const diffDays = (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);

  if (diffDays < 0) return 'backlog';
  if (diffDays <= 2) return 'high';
  return 'low';
}

export function formatDate(dateString: string) {
  const formattedDate = moment(dateString).format('YYYY-MM-DD');
  return formattedDate;
}
export function formatCnic(value: string) {
  if (value) {
    const phoneNumberString = value.toString();
    const formattedNumber = [];

    for (let i = 0; i < phoneNumberString.length; i++) {
      formattedNumber.push(phoneNumberString[i]);
      if (i === 4 || i === 11) {
        formattedNumber.push('-');
      }
    }

    return formattedNumber.join('');
  }
}

export function convertNumberToFormattedString(number: number) {
  if (number != 0) {
    const suffixes = ['', 'K', 'M', 'B', 'T'];
    const suffixIndex = Math.floor(Math.log10(number) / 3);
    const value = number / Math.pow(10, suffixIndex * 3);

    if (suffixIndex === 0) {
      return value.toString();
    } else {
      return value.toFixed(1) + suffixes[suffixIndex];
    }
  }
}

export const formatToPKR = (value: any) => {
  if (typeof value == 'number') {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 2, // Adjust for decimal places if needed
    }).format(value);
  } else {
    return value;
  }
};

export function formatCurrency(number: number) {
  if (typeof number !== 'number') {
    return 'Invalid input';
  }

  if (number === 0) {
    return 'Zero Rupees';
  }

  const units = [
    '',
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
    'Ten',
    'Eleven',
    'Twelve',
    'Thirteen',
    'Fourteen',
    'Fifteen',
    'Sixteen',
    'Seventeen',
    'Eighteen',
    'Nineteen',
  ];
  const tens = [
    '',
    '',
    'Twenty',
    'Thirty',
    'Forty',
    'Fifty',
    'Sixty',
    'Seventy',
    'Eighty',
    'Ninety',
  ];
  const scales = ['', 'Thousand', 'Million', 'Billion', 'Trillion']; // Add more as needed

  function convertToWords(num: number) {
    if (num < 20) {
      return `${units[num]}`;
    } else if (num < 100) {
      return (`${tens[Math.floor(num / 10)] + (num % 10 ? ' ' + units[num % 10] : '')}`);
    } else if (num < 1000) {
      let temp: any = convertToWords(num % 100);
      return (
        `${units[Math.floor(num / 100)] +
        ' Hundred' +
        (num % 100 ? ' ' + temp : '')}`
      );
    }
    return ''; // Should not reach here in this usage
  }

  let words = '';
  let remaining = number;
  let scaleIndex = 0;

  while (remaining > 0) {
    const chunk = remaining % 1000;
    if (chunk > 0) {
      words =
        convertToWords(chunk) +
        (scales[scaleIndex] ? ' ' + scales[scaleIndex] : '') +
        (words ? ', ' + words : '');
    }
    remaining = Math.floor(remaining / 1000);
    scaleIndex++;
  }

  return words.trim() + ' Rupees';
}

export function getTimeSince(dateInput: string): string {
  const now = Date.now();
  let thenMs: number;

  // Detect numeric input (seconds-since-epoch)
  if (/^\d+$/.test(dateInput)) {
    thenMs = parseInt(dateInput, 10) * 1000;
  } else {
    // Assume any other string is ISO-parsable
    thenMs = new Date(dateInput).getTime();
  }

  const diffMs = now - thenMs;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHr / 24);
  const diffWk = Math.floor(diffDays / 7);

  if (diffWk >= 1) {
    return diffWk === 1 ? '1 week ago' : `${diffWk} weeks ago`;
  } else if (diffDays >= 1) {
    return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
  } else if (diffHr >= 1) {
    return diffHr === 1 ? '1 hour ago' : `${diffHr} hours ago`;
  } else if (diffMin >= 1) {
    return diffMin === 1 ? '1 minute ago' : `${diffMin} minutes ago`;
  } else {
    // show seconds (never negative)
    const secs = Math.max(diffSec, 0);
    return secs <= 1 ? '1 second ago' : `${secs} seconds ago`;
  }
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const layout = {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
};

export const w = (i: number) => layout.window.width * i;

export const h = (i: number) => layout.window.height * i;
