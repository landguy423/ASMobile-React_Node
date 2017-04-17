/*eslint comma-dangle: ["error", "ignore"]*/
var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
import checkSendGrid from 'src/support/check/checkSendGrid';
var helper = require('sendgrid').mail;
const invalidAddress = 'INVALID@xschristians.org';
const from_email = new helper.Email('aljones15@gmail.com');
const to_email = new helper.Email(invalidAddress);
const subject = 'Unit Test Send Grid';
const content = new helper.Content('text/plain', 'Unit Test ' + new Date().toString());
const mail = new helper.Mail(from_email, subject, to_email, content);

var request = sg.emptyRequest({
  method: 'POST',
  path: '/v3/mail/send',
  body: mail.toJSON()
});

describe('send grid should', () => {
  sg.API(request, function(error, response){
    console.log('invalid email was sent with sattus code ' + response.statusCode);
  });
  
  it('show a bounced email', () => {
    checkSendGrid(invalidAddress, () => {});    
  });

})
