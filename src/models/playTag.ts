import FileTag from './fileTag';
import FlexMLTag, {FlexMLTagProperties, FlexMLAttributes} from './fleXmlTag';

export interface PlayTagAttributes extends FlexMLAttributes {
  action?: string;
  background?: boolean;
  controlSkip?: number;
  digits?: string;
  errorAction?: string;
  errorMethod?: string;
  forwardOnKey?: string;
  informationAudioUrl?: string;
  informationOnKey?: string;
  loop?: number;
  loopPause?: number;
  method?: string;
  minorControlSkip?: number;
  minorForwardOnKey?: string;
  minorRewindOnKey?: string;
  pauseAudioUrl?: string;
  preBuffer?: number;
  restartOnKey?: string;
  rewindOnKey?: string;
  skip?: number;
  stopOnKey?: string;
  streaming?: boolean;
  strictForwardControl?: boolean;
  timeLimit?: number;
  waitInitial?: number;
  waitInitialUrl?: string;
  waitRepeat?: number;
  waitRepeatUrl?: string;
}

export type PlayTagChildren = FlexMLTag & FileTag;

export interface PlayTagProperties {
  attributes?: PlayTagAttributes;
  children?: PlayTagChildren[];
  text?: string;
}

export class PlayTag extends FlexMLTag {
  constructor({
    attributes = undefined,
    children = undefined,
    text = undefined,
  }: FlexMLTagProperties = {}) {
    super('Play', {attributes, children, text});
    if (!this.hasAttribute('voice')) {
      this.addAttribute('voice', 'Polly.Joanna');
    }
  }
}

export default PlayTag;
