/*
 Remove cycle from the object
*/

const List = function (val) {
  this.next = null;
  this.val = val;
};
const item1 = new List(10);
const item2 = new List(20);
const item3 = new List(30);

item1.next = item2;
item2.next = item3;
item3.next = item1;

function removeCircle(obj) {
  var weakSet = new WeakSet([obj]);

  /*
      WeakSets are collections of objects only.
      They cannot contain arbitrary values of any type, as Sets can.
    */

  (function iterateObject(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key) && typeof obj[key] === "object") {
        if (weakSet.has(obj[key])) {
          delete obj[key];
          break;
        } else {
          weakSet.add(obj[key]);
          iterateObject(obj[key]);
        }
      }
    }
  })(obj);
}

removeCircle(item1);

var temp = item1;
while (temp) {
  console.log("value ", temp.val);
  temp = temp.next;
}
