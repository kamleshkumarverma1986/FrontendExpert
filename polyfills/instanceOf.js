function instanceOf(obj, target) {
  if (!obj || typeof obj !== "object") return false;

  let prototypeObject = Object.getPrototypeOf(obj);
  while (prototypeObject) {
    if (prototypeObject === target.prototype) {
      return true;
    } else {
      prototypeObject = Object.getPrototypeOf(prototypeObject);
    }
  }
  return false;
}
