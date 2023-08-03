// eslint-disable-next-line node/no-unpublished-import
import request from 'supertest';
import dotenv from 'dotenv';

dotenv.config();

// const baseUrl = 'http://localhost:3000';
const baseUrl = `${process.env.TEST_PROTOCOL}://${process.env.TEST_DOMAIN}`;
const prolog = '<?xml version="1.0" encoding="UTF-8"?>';

describe('POST /api/flexml', () => {
  const body = {
    AccountSid: '',
    OriginalTo: '15187216129',
    'SipHeader_Call-ID': '1cc3f805325349b75489650a3e4b1d24@12.7.192.27',
    PartnerSid: '155b6e31-4aa1-4c28-9c0f-f0156acaf7aa',
    Direction: 'inbound',
    OriginalFrom: '+19495107548',
    SipHeader_Contact: '<sip:+19495107548@10.1.110.197:5060>',
    EndpointSid: '29e5638c-ef0b-4571-a4c2-e801db7bbe1a',
    ApiVersion: '2.0',
    CallSid: '3fdb6a4c-2e6a-11ee-bc46-b87d5ef56c18',
    To: '15187216129',
    RequestUrl: `${baseUrl}/api/flexml`,
    CallerName: '',
    From: '19495107548',
  };

  it('should return 200', async () => {
    return request(`${baseUrl}`)
      .post('/api/flexml')
      .send(body)
      .set('Accept', 'application/xml')
      .expect(200);
  });

  it('should return a valid <Response/> tag', async () => {
    const expected = `${prolog}<Response><Pause length="1"/><Gather action="${baseUrl}/api/flexml/joke" numDigits="1" validDigits="9"><Say voice="Polly.Joanna">Hello and thank you for calling,, you are calling from  one,, nine four nine,, five one zero,, seven five four eight</Say><Say voice="Polly.Joanna">Your name is JOHN MCCORMICK</Say><Say voice="Polly.Joanna">Press 9 to hear a joke</Say></Gather></Response>`;
    const response = await request(`${baseUrl}`).post('/api/flexml').send(body);
    expect(response.text).toBe(expected);
  });
});

describe('POST /api/flexml/joke', () => {
  const body = {
    OriginalTo: '15187216129',
    AccountSid: '',
    OriginalFrom: '+19495107548',
    Direction: 'inbound',
    SipHeader_Contact: '<sip:+19495107548@10.1.110.75:5060>',
    ApiVersion: '2.0',
    CallerName: '',
    RequestUrl: `${baseUrl}/api/flexml/joke`,
    'SipHeader_Call-ID': '657a01545c76205a1b81d02820efaee2@12.7.192.27',
    PartnerSid: '155b6e31-4aa1-4c28-9c0f-f0156acaf7aa',
    EndpointSid: '29e5638c-ef0b-4571-a4c2-e801db7bbe1a',
    CallSid: '56859b40-2f15-11ee-8cd2-2207d9efa912',
    To: '15187216129',
    FinishKey: null,
    From: '19495107548',
    Digits: '9',
  };

  it('should return 200', async () => {
    return request(`${baseUrl}`)
      .post('/api/flexml/joke')
      .send(body)
      .set('Accept', 'application/xml')
      .expect(200);
  });

  it('should return a valid <Response/> tag', async () => {
    const expected = `${prolog}<Response><Say voice="Polly.Joanna">Please welcome to the stage ,, Matthew!</Say><Say voice="Polly.Matthew">A horse walks into a bar. the bartender says,, why the long face?</Say><Play voice="Polly.Joanna">${baseUrl}/media/rimshot.mp3</Play></Response>`;
    const response = await request(`${baseUrl}`)
      .post('/api/flexml/joke')
      .send(body);
    expect(response.text).toBe(expected);
  });
});
