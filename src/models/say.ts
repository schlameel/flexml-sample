import BaseModel from './base';

export class Say extends BaseModel {
  constructor() {
    super('Say');
    this.addAttribute('voice', 'Polly.Joanna');
  }
}

export default Say;
