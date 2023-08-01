import FleXmlTag, {IFlexXmlTagProperties} from './fleXmlTag';

export class ResponseTag extends FleXmlTag {
  constructor({
    attributes = undefined,
    children = undefined,
    text = undefined,
  }: IFlexXmlTagProperties = {}) {
    super('Response', {attributes, children, text});
  }
}

export default ResponseTag;
