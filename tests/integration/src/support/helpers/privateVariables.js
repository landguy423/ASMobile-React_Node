/**
* uses process.env to put private info not suitable for git in the selector
* @Param {string} a key referring to a process.env key
*/

module.exports = (key) => {
  if(process.env[key]){
    return process.env[key];
  }
  return key;
}
