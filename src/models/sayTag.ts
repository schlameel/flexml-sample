import FleXmlTag, {IFlexXmlAttributes} from './fleXmlTag';

export interface IFlexXmlSayTagProperties {
  attributes?: IFlexXmlAttributes;
  text?: any;
}

export class SayTag extends FleXmlTag {
  constructor({
    attributes = undefined,
    text = undefined,
  }: IFlexXmlSayTagProperties = {}) {
    super('Say', {attributes, text: text});
    if (!this.hasAttribute('voice')) {
      this.addAttribute('voice', 'Polly.Joanna');
    }
  }
}

export default SayTag;
