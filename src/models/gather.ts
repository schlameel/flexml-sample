import FleXmlTag, {IFlexXmlTagProperties} from './flexmltag';

export class Gather extends FleXmlTag {
  constructor({
    attributes = undefined,
    children = undefined,
    value = undefined,
  }: IFlexXmlTagProperties = {}) {
    super('Gather', {attributes, children, value});
  }
}

export default Gather;
