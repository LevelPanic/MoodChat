import moment from 'moment';
import { Dimensions } from 'react-native';
moment.locale('en-US'); // Set locale for formatting (optional)

export function capitalizeFirstLetter(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function formatDate(dateString: string) {
  const formattedDate = moment(dateString).format('YYYY-MM-DD h:mm A');
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

export function getTimeSince(dateString: string) {
  const now = moment();
  const then = moment(dateString);

  const diffInMilliseconds = now.diff(then);

  // Calculate difference in various units (seconds, minutes, hours, days)
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  // Define thresholds for unit selection
  const oneMinute = 60;
  const oneHour = oneMinute * 60;
  const oneDay = oneHour * 24;
  const oneWeek = oneDay * 7;

  // Logic for selecting the appropriate unit and formatting
  let formattedTime;
  if (diffInDays >= 7) {
    formattedTime = `${Math.floor(diffInDays / 7)} weeks ago`;
  } else if (diffInDays >= 1) {
    formattedTime = `${diffInDays} days ago`;
  } else if (diffInHours >= 1) {
    formattedTime = `${diffInHours} hours ago`;
  } else if (diffInMinutes > 0) {
    // Ensure minutes is greater than 0
    formattedTime = `${diffInMinutes} minutes ago`;
  } else {
    formattedTime = `${diffInSeconds} seconds ago`;
  }

  return formattedTime;
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
