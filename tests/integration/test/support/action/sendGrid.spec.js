/*eslint comma-dangle: ["error", "ignore"]*/
var sg = require('sendgrid')('uuwpjgdf')

describe(
  "send grid should", () => {
  it("send me an email", () => {
    var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: {
      personalizations: [
      {
        to: [
        { email: 'aljones15@gmail.com' }
        ],
        subject: 'Hello From Unit Test',
      }
      ],
      from: { email: 'xsx@xschristians.org' },
      content: [{ type: 'text/plain', value: 'Hi' }]
    }
    });

   sg.API(request)
     .then(response => {
    expect(response.success).toBeTruthy();
    })
  })

});
