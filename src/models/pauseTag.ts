import FlexMLTag, {FlexMLAttributes} from './fleXmlTag';

export interface PauseTagAttributes extends FlexMLAttributes {
  length?: number;
  minNoise?: number;
  minSilence?: number;
  noise?: boolean;
  silence?: boolean;
}

export interface PauseTagProperties {
  attributes?: PauseTagAttributes;
}

export class PauseTag extends FlexMLTag {
  constructor({attributes = undefined}: PauseTagProperties = {}) {
    super('Pause', {attributes});
    if (!this.hasAttribute('length')) {
      this.addAttribute('length', 1);
    }
  }
}

export default PauseTag;
