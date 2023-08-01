import FleXmlTag, {IFlexXmlTagProperties} from './fleXmlTag';

export class GatherTag extends FleXmlTag {
  constructor({
    attributes = undefined,
    children = undefined,
    value = undefined,
  }: IFlexXmlTagProperties = {}) {
    super('Gather', {attributes, children, value});
  }
}

export default GatherTag;
