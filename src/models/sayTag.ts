import FlexMLTag, {FlexMLAttributes} from './fleXmlTag';

export interface SayTagAttributes extends FlexMLAttributes {
  loop?: number;
  loopPause?: number;
  voice?: string;
}

export interface SayTagProperties {
  attributes?: SayTagAttributes;
  text?: any;
}

export class SayTag extends FlexMLTag {
  constructor({
    attributes = undefined,
    text = undefined,
  }: SayTagProperties = {}) {
    super('Say', {attributes, text: text});
    if (!this.hasAttribute('voice')) {
      this.addAttribute('voice', 'Polly.Joanna');
    }
  }
}

export default SayTag;
