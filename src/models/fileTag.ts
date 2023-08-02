import FlexMLTag from './fleXmlTag';

export interface FileTagProperties {
  text?: string;
}

export class FileTag extends FlexMLTag {
  constructor({text = undefined}: FileTagProperties = {}) {
    super('File', {text});
  }
}

export default FileTag;
