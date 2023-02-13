/*

Implement Custom Cookies: 

Input:

seCustomCookie();

document.myCookie = "blog=abc";
document.myCookie = "name=kamlesh;max-age=1";

console.log(document.myCookie); // "blog=abc; name=kamlesh"
setTimeout(() => {
  console.log(document.myCookie); // "blog=abc"
}, 1500);

*/

function seCustomCookie() {
  var allCookies = {};
  Object.defineProperty(document, "myCookie", {
    get: function () {
      return Object.keys(allCookies).join("; ");
    },

    set: function (value) {
      const [cookies, maxAge] = value.split(";");
      allCookies[cookies] = cookies; //{ name=prashant :"name=prashant" }
      if (maxAge) {
        const [key, value] = maxAge.split("=");
        if (key === "max-age") {
          setTimeout(() => {
            delete allCookies[cookies];
          }, Number(value) * 1000);
        }
      }
    },
  });
}

seCustomCookie();

document.myCookie = "blog=abc";
document.myCookie = "name=kamlesh;max-age=1";

console.log(document.myCookie); // "blog=abc; name=kamlesh"
setTimeout(() => {
  console.log(document.myCookie); // "blog=abc"
}, 1500);
