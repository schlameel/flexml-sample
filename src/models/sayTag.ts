import FleXmlTag, {IFlexXmlAttributes} from './fleXmlTag';

export interface IFlexXmlSayTagProperties {
  attributes?: IFlexXmlAttributes;
  children?: FleXmlTag[];
  value?: any;
}

export class SayTag extends FleXmlTag {
  constructor({
    attributes = undefined,
    value = undefined,
  }: IFlexXmlSayTagProperties = {}) {
    super('Say', {attributes, value});
    if (!this.hasAttribute('voice')) {
      this.addAttribute('voice', 'Polly.Joanna');
    }
  }
}

export default SayTag;
