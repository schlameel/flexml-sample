import FlexMLTag, {FlexMLTagProperties} from './fleXmlTag';

export class ResponseTag extends FlexMLTag {
  constructor({
    attributes = undefined,
    children = undefined,
    text = undefined,
  }: FlexMLTagProperties = {}) {
    super('Response', {attributes, children, text});
  }
}

export default ResponseTag;
