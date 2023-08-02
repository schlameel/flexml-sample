import FlexMLTag, {FlexMLAttributes} from './fleXmlTag';
import PlayTag from './playTag';
import SayTag from './sayTag';

export interface GatherTagAttributes extends FlexMLAttributes {
  action?: string;
  finishOnKey?: string;
  method?: string;
  numDigits?: number;
  timeout?: number;
  validDigits?: string;
}

export type GatherTagChildren = FlexMLTag & (SayTag | PlayTag);

export interface GatherTagProperties {
  attributes?: GatherTagAttributes;
  children?: GatherTagChildren[];
  text?: string;
}

export class GatherTag extends FlexMLTag {
  constructor({
    attributes = undefined,
    children = undefined,
    text = undefined,
  }: GatherTagProperties = {}) {
    super('Gather', {attributes, children, text});
  }
}

export default GatherTag;
