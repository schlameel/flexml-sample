import {inspect} from 'util';
import {format} from 'url';
import {Request, Response} from 'express';
import {Response as ResponseXML} from '../models/response';
import {Say} from '../models/say';
import Gather from '../models/gather';
import Play from '../models/play';
import {lookupPhoneNumber, phoneNumberToNiceText} from '../core/flexMlCore';

class FlexMLCtrl {
  introduction = async (req: Request, res: Response) => {
    try {
      console.debug(`body:\n${inspect(req.body)}`);
      const phoneNumber = req.body['From'];
      const name = await lookupPhoneNumber(phoneNumber);
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
      sayFirst.value = `,,,, Hello and thank you for calling,, you are calling from ${phoneNumberToNiceText(
        phoneNumber
      )}`;
      const saySecond = new Say();
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
      const response = new ResponseXML({
        children: [
          new Say({
            value:
              'A horse walks into a bar. the bartender says,, why the long face?',
          }),
          new Play({
            value: format({
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
    const response = new ResponseXML({
      children: [
        new Say({
          value: `There was an error.  The error message is,,, ${errorMessage}`,
        }),
      ],
    });
    return response.toXml();
  };
}

export default FlexMLCtrl;
