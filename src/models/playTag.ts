import FleXmlTag, {IFlexXmlTagProperties} from './flexmltag';

export class Play extends FleXmlTag {
  constructor({
    attributes = undefined,
    children = undefined,
    value = undefined,
  }: IFlexXmlTagProperties = {}) {
    super('Play', {attributes, children, value});
    if (!this.hasAttribute('voice')) {
      this.addAttribute('voice', 'Polly.Joanna');
    }
  }
}

export default Play;
