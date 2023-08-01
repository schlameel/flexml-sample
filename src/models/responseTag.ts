import FleXmlTag, {IFlexXmlTagProperties} from './fleXmlTag';

export class ResponseTag extends FleXmlTag {
  constructor({
    attributes = undefined,
    children = undefined,
    value = undefined,
  }: IFlexXmlTagProperties = {}) {
    super('Response', {attributes, children, value});
  }
}

export default ResponseTag;
