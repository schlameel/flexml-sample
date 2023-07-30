{ Gather: { $: { action: "/api/flexml/joke", }, _: { Say: { $: { voice: "Polly.Joanna", }, }, }, }, }
{ Gather: { _attributes: { action: "/api/flexml/joke" }, elements: [ {Say: { _attributes: { voice: "Polly.Joanna", }, } } ] } }

{
  Gather: {
    $: {
      action: "/api/flexml/joke",
    },
    _: [
      {
        Say: {
          $: {
            voice: "Polly.Joanna",
          },
        },
      },
    ],
  },
}

{
  elements: [
    {
      type: 'element',
      name: 'Gather',
      attributes: {
        action: '/api/flexml/joke',
        method: 'post',
      },
      elements: [
        {
          type: 'element',
          name: 'Say',
          attributes: {
            voice: 'Polly.Joanna',
          },
          elements: [
            {
              type: 'text',
              text: 'Hello',
            },
          ],
        },
        {
          type: 'element',
          name: 'Say',
          attributes: {
            voice: 'Polly.Joanna',
          },
          elements: [
            {
              type: 'text',
              text: 'There',
            },
          ],
        },
      ]
    }
  ]
}

body: {
  "OriginalTo": "15187216129",
  "AccountSid": "",
  "OriginalFrom": "+19495107548",
  "Direction": "inbound",
  "SipHeader_Contact": "<sip:+19495107548@10.1.110.75:5060>",
  "ApiVersion": "2.0",
  "CallerName": "",
  "RequestUrl": "https://5e72-68-4-38-130.ngrok-free.app/api/flexml",
  "SipHeader_Call-ID": "657a01545c76205a1b81d02820efaee2@12.7.192.27",
  "PartnerSid": "155b6e31-4aa1-4c28-9c0f-f0156acaf7aa",
  "EndpointSid": "29e5638c-ef0b-4571-a4c2-e801db7bbe1a",
  "CallSid": "56859b40-2f15-11ee-8cd2-2207d9efa912",
  "To": "15187216129",
  "FinishKey": null,
  "From": "19495107548",
  "Digits": "9"
}
