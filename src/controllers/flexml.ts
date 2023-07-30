//import {inspect} from 'util';
import {format} from 'url';
import {Request, Response} from 'express';
import axios, {AxiosRequestConfig} from 'axios';
import {Response as ResponseXML} from '../models/response';
import {Say} from '../models/say';
import {DidLookup} from '../models/didLookup';
import Gather from '../models/gather';

class FlexMLCtrl {
  get = async (req: Request, res: Response) => {
    try {
      const text: string = req.params.text;
      const dataUri = {text};
      res.status(200).json({dataUri});
    } catch (err: any) {
      res.status(500).json({error: err.message});
    }
  };

  post = async (req: Request, res: Response) => {
    try {
      const phoneNumber = req.body['From'];
      const name = await this.lookupPhoneNumber(phoneNumber);
      const response = new ResponseXML();
      const gather = new Gather();
      gather.addAttribute(
        'action',
        format({
          protocol: req.protocol,
          host: req.get('host'),
          pathname: req.originalUrl + '/joke',
        })
      );
      gather.addAttribute('numDigits', 1);
      gather.addAttribute('validDigits', '9');
      const sayFirst = new Say();
      sayFirst.value = `Hello and thank you for calling,, you are calling from ${this.phoneNumberToNiceText(
        phoneNumber
      )}`;
      const saySecond = new Say();
      saySecond.value = `Your name is ${name}`;
      gather.children = [sayFirst, saySecond];
      response.children = [gather];
      res.status(200).send(response.toXml());
    } catch (error: unknown) {
      if (typeof error === 'string') {
        res.status(500).json({error: error});
      } else if (error instanceof Error) {
        res.status(500).json({error: error.message});
      } else {
        res.status(500).json({error: 'unknown'});
      }
    }
  };

  joke = async (req: Request, res: Response) => {
    try {
      const response = new ResponseXML();
      const say = new Say();
      say.value =
        'A horse walks into a bar. the bartender says,, why the long face?';
      response.children = [say];
      res.status(200).send(response.toXml());
    } catch (err: any) {
      res.status(500).json({error: err.message});
    }
  };

  private phoneNumberToNiceText(phoneNumber: string): string {
    if (phoneNumber.length !== 11) {
      return phoneNumber;
    }
    const pause = ',,';
    return (
      this.numberToWords(phoneNumber[0]) +
      pause +
      this.numberToWords(phoneNumber.substring(1, 4)) +
      pause +
      this.numberToWords(phoneNumber.substring(4, 7)) +
      pause +
      this.numberToWords(phoneNumber.substring(7))
    );
  }

  private numberToWords(number: string): string {
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
  }

  private lookupPhoneNumber = async (phoneNumber: string) => {
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
}

export default FlexMLCtrl;
