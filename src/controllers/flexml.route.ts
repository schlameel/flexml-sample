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
      const jokeCallbackUrl = format({
        protocol: req.get('host')?.includes('localhost') ? 'http' : 'https',
        host: req.get('host'),
        pathname: req.originalUrl + '/joke',
      });
      // <Response>
      const response = new ResponseTag({
        children: [
          // <Pause length="1"/>
          new PauseTag(),
          // <Gather action="https://flexml.schlameel.com/api/flexml/joke" numDigits="1" validDigits="9">
          new GatherTag({
            attributes: {
              action: jokeCallbackUrl,
              numDigits: 1,
              validDigits: '9',
            },
            children: [
              // SayTag changes the default voice to Polly.Joanne
              // <Say voice="Polly.Joanne">Hello and thank you for calling,, you are calling from one eight zero zero,, five five five,, one two three four</Say>
              new SayTag({
                text: `Hello and thank you for calling${fleXmlPause} you are calling from ${sayablePhoneNumber(
                  phoneNumber
                )}`,
              }),
              // <Say voice="Polly.Joanne">Your name is BOB SMITH</Say>
              new SayTag({
                text: `Your name is ${name}`,
              }),
              // <Say voice="Polly.Joanne">Press 9 to hear a joke</Say>
              // Comment the following for Easter egg mode
              new SayTag({
                text: 'Press 9 to hear a joke',
              }),
            ],
          }),
          // </Gather>
        ],
      });
      // </Response>
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
      // <Response>
      const response = new ResponseTag({
        children: [
          // <Say voice="Polly.Joanne">Please welcome to the stage ,, Matthew!</Say>
          new SayTag({
            text: `Please welcome to the stage ${fleXmlPause} Matthew!`,
          }),
          // <Say voice="Polly.Matthew">A horse walks into a bar. the bartender says,, why the long face?</Say>
          new SayTag({
            attributes: {
              voice: 'Polly.Matthew',
            },
            text: `A horse walks into a bar. the bartender says${fleXmlPause} why the long face?`,
          }),
          // <Play>https://flexml.schlameel.com/public/media/rimshot.mp3</Play>
          new PlayTag({
            text: rimShotUrl,
          }),
        ],
      });
      // </Response>
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
