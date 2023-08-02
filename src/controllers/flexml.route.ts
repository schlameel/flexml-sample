// import {inspect} from 'util';
import {format} from 'url';
import {Request, Response} from 'express';
import {ResponseTag} from '../models/responseTag';
import {SayTag} from '../models/sayTag';
import GatherTag from '../models/gatherTag';
import PlayTag from '../models/playTag';
import {
  fleXmlPause,
  lookupPhoneNumberDetails,
  sayablePhoneNumber,
} from '../core/flexMlCore';
import PauseTag from '../models/pauseTag';

class FlexMLCtrl {
  introduction = async (req: Request, res: Response) => {
    try {
      const phoneNumber = req.body['From'];
      const name = await lookupPhoneNumberDetails(phoneNumber);
      const jokeUrl = format({
        protocol: req.get('host')?.includes('localhost') ? 'http' : 'https',
        host: req.get('host'),
        pathname: req.originalUrl + '/joke',
      });
      const response = new ResponseTag({
        children: [
          new PauseTag(),
          new GatherTag({
            attributes: {
              action: jokeUrl,
              numDigits: 1,
              validDigits: '9',
            },
            children: [
              new SayTag({
                text: `Hello and thank you for calling${fleXmlPause} you are calling from ${sayablePhoneNumber(
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
      res
        .contentType('application/xml')
        .status(500)
        .send(this.errorResponse(error));
    }
  };

  joke = async (req: Request, res: Response) => {
    try {
      const rimShotUrl = format({
        protocol: req.get('host')?.includes('localhost') ? 'http' : 'https',
        host: req.get('host'),
        pathname: '/media/rimshot.mp3',
      });
      const response = new ResponseTag({
        children: [
          new SayTag({
            text: `A horse walks into a bar. the bartender says${fleXmlPause} why the long face?`,
          }),
          new PlayTag({
            text: rimShotUrl,
          }),
        ],
      });
      res.contentType('application/xml').status(200).send(response.toXml());
    } catch (error: unknown) {
      res
        .contentType('application/xml')
        .status(500)
        .send(this.errorResponse(error));
    }
  };

  private errorResponse = (error: unknown): string => {
    let errorMessage = 'unknown error';
    if (typeof error === 'string') {
      errorMessage = error;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
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
