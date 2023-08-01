import FleXmlTag, {IFlexXmlTagProperties} from './flexmltag';

export class Response extends FleXmlTag {
  constructor({
    attributes = undefined,
    children = undefined,
    value = undefined,
  }: IFlexXmlTagProperties = {}) {
    super('Response', {attributes, children, value});
  }
}

export default Response;
