import {Gather} from '../../src/models/gather';
import {Say} from '../../src/models/say';

describe('Gather XML model', () => {
  test('Empty doc', () => {
    const emptyDoc = '<Gather/>';
    const gather: Gather = new Gather();
    expect(gather.toXml()).toBe(emptyDoc);
  });

  test('Doc with value', () => {
    const valueDoc = '<Gather>Hello!</Gather>';
    const gather: Gather = new Gather();
    gather.value = 'Hello!';
    expect(gather.toXml()).toBe(valueDoc);
  });

  test('Doc with single child', () => {
    const docWithSingleChild = '<Gather><Say voice="Polly.Joanna"/></Gather>';
    const gather: Gather = new Gather();
    gather.children = [new Say()];
    expect(gather.toXml()).toBe(docWithSingleChild);
  });

  test('Doc with multiple children', () => {
    const docWithSingleChild =
      '<Gather><Say voice="Polly.Joanna"/><Say voice="Polly.Joanna"/></Gather>';
    const gather: Gather = new Gather();
    gather.children = [new Say(), new Say()];
    expect(gather.toXml()).toBe(docWithSingleChild);
  });

  test('Doc with single attribute, no children', () => {
    const doc = '<Gather action="/api/flexml/joke"/>';
    const gather: Gather = new Gather();
    gather.addAttribute('action', '/api/flexml/joke');
    expect(gather.toXml()).toBe(doc);
  });

  test('Doc with multiple attributes, no children', () => {
    const doc =
      '<Gather action="/api/flexml/joke" method="post" numDigits="1" finishOnKey="9" validDigits="9"/>';
    const gather: Gather = new Gather();
    gather.addAttribute('action', '/api/flexml/joke');
    gather.addAttribute('method', 'post');
    gather.addAttribute('numDigits', '1');
    gather.addAttribute('finishOnKey', '9');
    gather.addAttribute('validDigits', '9');
    expect(gather.toXml()).toBe(doc);
  });

  test('Doc with single attribute, one child', () => {
    const doc =
      '<Gather action="/api/flexml/joke"><Say voice="Polly.Joanna"/></Gather>';
    const say = new Say();
    const gather: Gather = new Gather();
    gather.children = [say];
    gather.addAttribute('action', '/api/flexml/joke');
    expect(gather.toXml()).toBe(doc);
  });

  test('Doc with multiple attributes, no children', () => {
    const doc =
      '<Gather action="/api/flexml/joke" method="post" numDigits="1" finishOnKey="9" validDigits="9"/>';
    const gather: Gather = new Gather();
    gather.addAttribute('action', '/api/flexml/joke');
    gather.addAttribute('method', 'post');
    gather.addAttribute('numDigits', '1');
    gather.addAttribute('finishOnKey', '9');
    gather.addAttribute('validDigits', '9');
    expect(gather.toXml()).toBe(doc);
  });
});
