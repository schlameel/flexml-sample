import FleXmlTag from './fleXmlTag';

export interface PauseTagAttributes {
  length?: number;
  minNoise?: number;
  minSilence?: number;
  noise?: boolean;
  silence?: boolean;
}

export interface PauseTagProperties {
  attributes?: PauseTagAttributes;
}

export class PauseTag extends FleXmlTag {
  constructor({attributes = undefined}: PauseTagProperties = {}) {
    super('Pause', {attributes});
    if (!this.hasAttribute('length')) {
      this.addAttribute('length', 1);
    }
  }
}

export default PauseTag;
