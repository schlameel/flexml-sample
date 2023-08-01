import FleXmlTag, {IFlexXmlTagProperties} from './fleXmlTag';

export class GatherTag extends FleXmlTag {
  constructor({
    attributes = undefined,
    children = undefined,
    text = undefined,
  }: IFlexXmlTagProperties = {}) {
    super('Gather', {attributes, children, text});
  }
}

export default GatherTag;
