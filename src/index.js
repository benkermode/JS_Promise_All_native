//document.getElementById("app").innerHTML = `<span>yo</span>`;

// Implement Promise.all([promises]) helper.
// It should return new promise that will be
// fulfilled with values of all passed promises OR rejected with a value of first rejected promise.

const waitAllPromises = async promises => {
  const promiseAllResult = [];

  return new Promise(async (resolve, reject) => {
    for (let currentPromise of promises) {
      try {
        promiseAllResult.push(await currentPromise);
        if (promiseAllResult.length === promises.length) {
          resolve(promiseAllResult);
        }
      } catch (error) {
        reject(error);
      }
      /*
      currentPromise
        .then(result => {
          promiseAllResult.push(result);
          if (promiseAllResult.length === promises.length) {
            resolve(promiseAllResult);
          }
        })
        .catch(error => reject(error));*/
    }
  });
};

const promises = [
  new Promise(resolver => setTimeout(() => resolver("result 1"), 100)),
  new Promise(resolver => setTimeout(() => resolver("result 2"), 200)),
  new Promise((resolver, rejector) => {
    setTimeout(() => {
      resolver("result 3");
      //rejector("reject error 3");
    }, 300);
  })
];

/**
 * when you need to create a func just to use async, it's not worth it
 * Async func to call waitAllPromises: 8 LINES
 * Normal .then and .catch: 3 LINES
 */
/*const callAll = async () => {
  try {
    console.log("result", await waitAllPromises(promises));
  } catch (error) {
    console.log("all error", error);
  }
};
callAll();*/
waitAllPromises(promises)
  .then(result => console.log("all result:", result))
  .catch(error => console.log("all error", error));
