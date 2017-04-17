var sg = require('sendgrid')(process.env.SENDGRID_API_KEY) 
/**
* use send grid's api to check if an email was sent
* @param    {String}     to     the email addrres the message was set te 
* @param    {String}     subject   the email's subject
* @param    {String}    from   the from
* @param    {Function}   done  callback called when done
*/

module.exports = (to, done) => {
  // send grid only takes unix time strings 
  function toUnixTime(date){
    return String(Math.ceil(date.getTime() / 1000));
  }

  // constructs an bounces request
  function invalidEmailsRequest(start, end){
      return sg.emptyRequest({
      method: 'GET',
      path: '/v3/suppression/bounces',
      queryParams: { start_time: toUnixTime(start), end_time: toUnixTime(end) }
    });
  }

  // looks for bounced emails that occured with in the last hour
  function invalidEmailsRecent(){
    const oneHourAgo = new Date(new Date().setHours(new Date().getHours() - 1));
    const now = new Date();
    return invalidEmailsRequest(oneHourAgo, now);
  }
    sg.API(invalidEmailsRecent())
    .then(response => {
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body.length).toBeGreaterThanOrEqual(1);
      expect(response.body[0].email).toMatch(to.trim().toLowerCase());
      
    })
    .catch((e) => console.log(e));
  done(); 
  
}
