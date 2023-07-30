// eslint-disable-next-line node/no-unpublished-import
import request from 'supertest';

const baseUrl = 'http://localhost:3000';

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
    RequestUrl: 'http://localhost:3000/api/flexml',
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
    const expected =
      '<Response><Gather action="http://localhost:3000/api/flexml/joke" numDigits="1" validDigits="9"><Say voice="Polly.Joanna">,,,, Hello and thank you for calling,, you are calling from  one,, nine four nine,, five one zero,, seven five four eight</Say><Say voice="Polly.Joanna">Your name is JOHN MCCORMICK</Say></Gather></Response>';
    const response = await request(`${baseUrl}`).post('/api/flexml').send(body);
    expect(response.text).toBe(expected);
  });
});
