import {ResponseTag} from '../../src/models/responseTag';
import {SayTag} from '../../src/models/sayTag';

const prolog = '<?xml version="1.0" encoding="UTF-8"?>';

describe('Response XML model', () => {
  test('Empty doc', () => {
    const emptyDoc = `${prolog}<Response/>`;
    const response: ResponseTag = new ResponseTag();
    expect(response.toXml()).toBe(emptyDoc);
  });

  test('Doc with text', () => {
    const textDoc = `${prolog}<Response>Hello!</Response>`;
    const response: ResponseTag = new ResponseTag({
      text: 'Hello!',
    });
    expect(response.toXml()).toBe(textDoc);
  });

  test('Doc with single child', () => {
    const docWithSingleChild = `${prolog}<Response><Say voice="Polly.Joanna"/></Response>`;
    const response: ResponseTag = new ResponseTag({
      children: [new SayTag()],
    });
    expect(response.toXml()).toBe(docWithSingleChild);
  });

  test('Doc with multiple children', () => {
    const docWithSingleChild = `${prolog}<Response><Say voice="Polly.Joanna"/><Say voice="Polly.Joanna"/></Response>`;
    const response: ResponseTag = new ResponseTag({
      children: [new SayTag(), new SayTag()],
    });
    expect(response.toXml()).toBe(docWithSingleChild);
  });
});
