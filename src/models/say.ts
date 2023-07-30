import FleXmlTag, {IFlexXmlAttributes} from './flexmltag';

export interface IFlexXmlSayTagProperties {
  attributes?: IFlexXmlAttributes;
  children?: FleXmlTag[];
  value?: any;
}

export class Say extends FleXmlTag {
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

export default Say;
