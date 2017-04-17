/**
* append a nth-child selector to the css selector
* @param {String} a css selector
* @param {String} order
*/

module.exports = (element, order) => {
  if(!order){ return element; }
  order = order.trim().toLowerCase();
  switch(order){
    case "first":
      return element + ":nth-child(1)";
    case "second":
      return element + ":nth-child(2)";
    case "third":
      return element + ":nth-child(3)";
    case "fourth":
      return element + ":nth-child(4)";
    case "fifth":
      return element + ":nth-child(5)";
    case "sixth":
      return element + ":nth-child(6)";
    case "seventh":
      return element + ":nth-child(7)";
    default:
      return element;
  }
}
