// import {inspect} from 'util';
import {format} from 'url';
import {Request, Response} from 'express';
import {ResponseTag} from '../models/responseTag';
import {SayTag} from '../models/sayTag';
import GatherTag from '../models/gatherTag';
import PlayTag from '../models/playTag';
import {lookupPhoneNumber, phoneNumberToNiceText} from '../core/flexMlCore';

class FlexMLCtrl {
  introduction = async (req: Request, res: Response) => {
    try {
      const phoneNumber = req.body['From'];
      const name = await lookupPhoneNumber(phoneNumber);
      const response = new ResponseTag();
      const gather = new GatherTag();
      gather.addAttribute(
        'action',
        format({
          protocol: req.get('host')?.includes('ngrok') ? 'https' : 'http',
          host: req.get('host'),
          pathname: req.originalUrl + '/joke',
        })
      );
      gather.addAttribute('numDigits', 1);
      gather.addAttribute('validDigits', '9');
      const sayFirst = new SayTag();
      sayFirst.value = `,,,, Hello and thank you for calling,, you are calling from ${phoneNumberToNiceText(
        phoneNumber
      )}`;
      const saySecond = new SayTag();
      saySecond.value = `Your name is ${name}`;
      gather.children = [sayFirst, saySecond];
      response.children = [gather];
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
            value:
              'A horse walks into a bar. the bartender says,, why the long face?',
          }),
          new PlayTag({
            value: format({
              protocol: req.get('host')?.includes('ngrok') ? 'https' : 'http',
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
          value: `There was an error.  The error message is,,, ${errorMessage}`,
        }),
      ],
    });
    return response.toXml();
  };
}

export default FlexMLCtrl;
