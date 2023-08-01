import {GatherTag} from '../../src/models/gatherTag';
import {SayTag} from '../../src/models/sayTag';

const prolog = '<?xml version="1.0" encoding="UTF-8"?>';

describe('Gather XML model', () => {
  test('Empty doc', () => {
    const emptyDoc = `${prolog}<Gather/>`;
    const gather: GatherTag = new GatherTag();
    expect(gather.toXml()).toBe(emptyDoc);
  });

  test('Doc with text', () => {
    const textDoc = `${prolog}<Gather>Hello!</Gather>`;
    const gather: GatherTag = new GatherTag({
      text: 'Hello!',
    });
    expect(gather.toXml()).toBe(textDoc);
  });

  test('Doc with single child', () => {
    const docWithSingleChild = `${prolog}<Gather><Say voice="Polly.Joanna"/></Gather>`;
    const gather: GatherTag = new GatherTag({
      children: [new SayTag()],
    });
    expect(gather.toXml()).toBe(docWithSingleChild);
  });

  test('Doc with multiple children', () => {
    const docWithSingleChild = `${prolog}<Gather><Say voice="Polly.Joanna"/><Say voice="Polly.Joanna"/></Gather>`;
    const gather: GatherTag = new GatherTag({
      children: [new SayTag(), new SayTag()],
    });
    expect(gather.toXml()).toBe(docWithSingleChild);
  });

  test('Doc with single attribute, no children', () => {
    const doc = `${prolog}<Gather action="/api/flexml/joke"/>`;
    const gather: GatherTag = new GatherTag({
      attributes: {action: '/api/flexml/joke'},
    });
    expect(gather.toXml()).toBe(doc);
  });

  test('Doc with multiple attributes, no children', () => {
    const doc = `${prolog}<Gather action="/api/flexml/joke" method="post" numDigits="1" finishOnKey="9" validDigits="9"/>`;
    const gather: GatherTag = new GatherTag({
      attributes: {
        action: '/api/flexml/joke',
        method: 'post',
        numDigits: '1',
        finishOnKey: '9',
        validDigits: '9',
      },
    });
    expect(gather.toXml()).toBe(doc);
  });

  test('Doc with single attribute, one child', () => {
    const doc = `${prolog}<Gather action="/api/flexml/joke"><Say voice="Polly.Joanna"/></Gather>`;
    const gather: GatherTag = new GatherTag({
      children: [new SayTag()],
      attributes: {action: '/api/flexml/joke'},
    });
    expect(gather.toXml()).toBe(doc);
  });

  test('Doc with multiple attributes, multiple children', () => {
    const doc = `${prolog}<Gather action="/api/flexml/joke" method="post" numDigits="1" finishOnKey="9" validDigits="9"><Say voice="Polly.Joanna"/><Say voice="Polly.Joanna"/></Gather>`;
    const gather: GatherTag = new GatherTag({
      attributes: {
        action: '/api/flexml/joke',
        method: 'post',
        numDigits: '1',
        finishOnKey: '9',
        validDigits: '9',
      },
      children: [new SayTag(), new SayTag()],
    });
    expect(gather.toXml()).toBe(doc);
  });
});
