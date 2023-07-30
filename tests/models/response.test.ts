import {Response} from '../../src/models/response';
import {Say} from '../../src/models/say';

describe('Response XML model', () => {
  test('Empty doc', () => {
    const emptyDoc = '<Response/>';
    const response: Response = new Response();
    expect(response.toXml()).toBe(emptyDoc);
  });

  test('Doc with value', () => {
    const valueDoc = '<Response>Hello!</Response>';
    const response: Response = new Response({
      value: 'Hello!',
    });
    expect(response.toXml()).toBe(valueDoc);
  });

  test('Doc with single child', () => {
    const docWithSingleChild =
      '<Response><Say voice="Polly.Joanna"/></Response>';
    const response: Response = new Response({
      children: [new Say()],
    });
    expect(response.toXml()).toBe(docWithSingleChild);
  });

  test('Doc with multiple children', () => {
    const docWithSingleChild =
      '<Response><Say voice="Polly.Joanna"/><Say voice="Polly.Joanna"/></Response>';
    const response: Response = new Response({
      children: [new Say(), new Say()],
    });
    expect(response.toXml()).toBe(docWithSingleChild);
  });
});
