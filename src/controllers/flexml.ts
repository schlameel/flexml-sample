// import {inspect} from 'util';
import {format} from 'url';
import {Request, Response} from 'express';
import {ResponseTag} from '../models/responseTag';
import {SayTag} from '../models/sayTag';
import GatherTag from '../models/gatherTag';
import PlayTag from '../models/playTag';
import {
  fleXmlPause,
  lookupPhoneNumber,
  phoneNumberAsIndividualNumbers,
} from '../core/flexMlCore';

class FlexMLCtrl {
  introduction = async (req: Request, res: Response) => {
    try {
      const phoneNumber = req.body['From'];
      const name = await lookupPhoneNumber(phoneNumber);
      const response = new ResponseTag({
        children: [
          new GatherTag({
            attributes: {
              action: format({
                protocol: req.protocol,
                host: req.get('host'),
                pathname: req.originalUrl + '/joke',
              }),
              numDigits: 1,
              validDigits: '9',
            },
            children: [
              new SayTag({
                text: `Hello and thank you for calling${fleXmlPause} you are calling from ${phoneNumberAsIndividualNumbers(
                  phoneNumber
                )}`,
              }),
              new SayTag({
                text: `Your name is ${name}`,
              }),
            ],
          }),
        ],
      });
      res.contentType('application/xml').status(200).send(response.toXml());
    } catch (error: unknown) {
      if (typeof error === 'string') {
        res
          .contentType('application/xml')
          .status(500)
          .send(this.errorResponse(error));
      } else if (error instanceof Error) {
        res
          .contentType('application/xml')
          .status(500)
          .send(this.errorResponse(error.message));
      } else {
        res
          .contentType('application/xml')
          .status(500)
          .send(this.errorResponse('unknown error'));
      }
    }
  };

  joke = async (req: Request, res: Response) => {
    try {
      const response = new ResponseTag({
        children: [
          new SayTag({
            text: `A horse walks into a bar. the bartender says${fleXmlPause} why the long face?`,
          }),
          new PlayTag({
            text: format({
              protocol: req.protocol,
              host: req.get('host'),
              pathname: '/media/rimshot.mp3',
            }),
          }),
        ],
      });
      res.contentType('application/xml').status(200).send(response.toXml());
    } catch (error: unknown) {
      if (typeof error === 'string') {
        res
          .contentType('application/xml')
          .status(500)
          .send(this.errorResponse(error));
      } else if (error instanceof Error) {
        res
          .contentType('application/xml')
          .status(500)
          .send(this.errorResponse(error.message));
      } else {
        res
          .contentType('application/xml')
          .status(500)
          .send(this.errorResponse('unknown error'));
      }
    }
  };

  private errorResponse = (errorMessage: string): string => {
    const response = new ResponseTag({
      children: [
        new SayTag({
          text: `There was an error.  The error message is ${fleXmlPause} ${errorMessage}`,
        }),
      ],
    });
    return response.toXml();
  };
}

export default FlexMLCtrl;
