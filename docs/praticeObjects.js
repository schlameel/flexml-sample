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