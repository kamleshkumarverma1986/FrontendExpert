/*
He (Lazyman) can sleepFirst(time: number), which has the highest priority among all tasks, no matter what the order is.

LazyMan('Jack', console.log).eat('banana').sleepFirst(10).eat('apple').sleep(1);

Output:

    (after 10 seconds)
    Wake up after 10 seconds.
    Hi, I'm Jack.
    Eat banana
    Eat apple
    (after 1 second)
    Wake up after 1 second.


Now Create such LazyMan()
*/

class LazyMan {
  constructor(name, logFunc) {
    this.logFunc = logFunc;
    this.allActions = [{ timer: 0, msg: `Hi, I'm ${name}.` }];
    this.executeLogFunc();
  }

  executeLogFunc() {
    setTimeout(async () => {
      for (let action of this.allActions) {
        await new Promise((resolve) => {
          if (action.timer) {
            setTimeout(resolve, action.timer * 1000);
          } else {
            resolve();
          }
        });
        this.logFunc(action.msg);
      }
    }, 0);
  }

  eat(food) {
    this.allActions.push({ timer: 0, msg: `Eat ${food}` });
    return this;
  }

  sleep(timeInSec) {
    this.allActions.push({
      timer: timeInSec,
      msg: `Wake up after ${timeInSec} seconds`,
    });
    return this;
  }

  sleepFirst(timeInSec) {
    this.allActions.unshift({
      timer: timeInSec,
      msg: `Wake up after ${timeInSec} seconds`,
    });
    return this;
  }
}

const lazyMan = new LazyMan("Jack", console.log);
lazyMan
  .eat("banana")
  .sleepFirst(10)
  .eat("apple")
  .sleepFirst(5)
  .sleep(1)
  .eat("mango");
