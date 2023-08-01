import FleXmlTag, {IFlexXmlTagProperties} from './fleXmlTag';

export class PlayTag extends FleXmlTag {
  constructor({
    attributes = undefined,
    children = undefined,
    text = undefined,
  }: IFlexXmlTagProperties = {}) {
    super('Play', {attributes, children, text});
    if (!this.hasAttribute('voice')) {
      this.addAttribute('voice', 'Polly.Joanna');
    }
  }
}

export default PlayTag;
