import axios, {AxiosRequestConfig} from 'axios';
import {DidLookup} from '../models/didLookup';

export const phoneNumberToNiceText = (phoneNumber: string): string => {
  if (phoneNumber.length !== 11) {
    return phoneNumber;
  }
  const pause = ',,';
  return (
    numberToWords(phoneNumber[0]) +
    pause +
    numberToWords(phoneNumber.substring(1, 4)) +
    pause +
    numberToWords(phoneNumber.substring(4, 7)) +
    pause +
    numberToWords(phoneNumber.substring(7))
  );
};

const numberToWords = (number: string): string => {
  let words = '';
  for (const digit of number) {
    switch (digit) {
      case '0':
        words += ' zero';
        break;

      case '1':
        words += ' one';
        break;

      case '2':
        words += ' two';
        break;

      case '3':
        words += ' three';
        break;

      case '4':
        words += ' four';
        break;

      case '5':
        words += ' five';
        break;

      case '6':
        words += ' six';
        break;

      case '7':
        words += ' seven';
        break;

      case '8':
        words += ' eight';
        break;

      case '9':
        words += ' nine';
        break;

      default:
        break;
    }
  }
  return words;
};

export const lookupPhoneNumber = async (phoneNumber: string) => {
  const baseUrl = 'https://api.carrierx.com/core/v2/lookup/dids/';
  const queryParams = '?cnam=true';
  const unknownName = 'unknown name';
  const accessToken = process.env.ACCESS_TOKEN;

  if (accessToken === undefined) {
    return unknownName;
  }

  try {
    const options: AxiosRequestConfig = {
      url: baseUrl + phoneNumber + queryParams,
      method: 'get',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await axios(options);
    const data: DidLookup = response.data as DidLookup;
    if (!Object.prototype.hasOwnProperty.call(data, 'details')) {
      return unknownName;
    }
    if (!Object.prototype.hasOwnProperty.call(data.details, 'cnam')) {
      return unknownName;
    }
    if (!Object.prototype.hasOwnProperty.call(data.details?.cnam, 'name')) {
      return unknownName;
    }
    return data.details?.cnam?.name;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
    return unknownName;
  }
};
