/*
 [Asked in FaceBook]

Have you ever used RxJS before? The most important concept in it is Observable and Observer.

Observable defines how values are delivered to Observer. Observer is just a set of callbacks.

Let's look at the code.

const observer = {
  next: (value) => {
     console.log('we got a value', value)
  },
  error: (error) => {
    console.log('we got an error', error)
  },
  complete: () => {
    console.log('ok, no more values')
  }
}

Above is an Observer which is pretty clear about what it is doing.

Then we could attach this Observer to some Observable. Observable feeds this observer with values or errors.

const observable = new Observable((subscriber)=> {
  subscriber.next(1)
  subscriber.next(2)
  setTimeout(() => {
    subscriber.next(3)
    subscriber.next(4)
    subscriber.complete()
  }, 100)
})
The code plainly says when is a subscriber is attached,

subscriber is fed with a value 1
subscriber is then fed with a value 2
wait 100 ms
subscriber is fed with 3
subscriber is fed with 4
no more values for subscriber
Now if we attach above observer to observable, next and complete of subscriber are called in order.(be aware that there is a delay between 2 and 3)

const sub = observable.subscribe(subscriber)
Output:
            we got a value 1
            we got a value 2

            we got a value 3
            we got a value 4
            ok, no more values

Notice subscribe() return a Subscription which could be used to stop listening to the value delivery.

const sub = observable.subscribe(subscriber)
setTimeout(() => {
  sub.unsubscribe()
}, 100)


So this is the basic idea of Observable and Observer. There will be a few more interesting follow-up problems.

Now you are asked to implement a basic Observable class, which makes above possible.

Some extra requirements are listed here.

    1. error and complete can only be delivered once, next/error/complete after error/complete should not work

    2. for a subscriber object, next/error/complete callback are all optional. if a function is passed as observer, it is treated as next.

    3. should support multiple subscription

*/

class Observable {
  constructor(setup) {
    this.setupCallback = setup;
  }

  subscribe(subscriber) {
    const observer = {
      id: `${Date.now()} + ${Math.random()}`,
      isTerminated: false,
    };
    if (typeof subscriber === "function") {
      observer.next = function (value) {
        if (!observer.isTerminated) {
          subscriber(value);
        }
      };
    } else if (typeof subscriber === "object") {
      observer.next = function (value) {
        !observer.isTerminated && subscriber.next && subscriber.next(value);
      };

      observer.error = function (err) {
        !observer.isTerminated && subscriber.error && subscriber.error(err);
        observer.isTerminated = true;
      };

      observer.complete = function () {
        !observer.isTerminated && subscriber.complete && subscriber.complete();
        observer.isTerminated = true;
      };
    }

    this.setupCallback(observer);

    return {
      unsubscribe: function () {
        observer.isTerminated = true;
      },
    };
  }
}

const observer = {
  next: (value) => {
    console.log("we got a value", value);
  },
  error: (error) => {
    console.log("we got an error", error);
  },
  complete: () => {
    console.log("ok, no more values");
  },
};

const observable = new Observable((observer) => {
  observer.next(1);
  observer.next(2);
  setTimeout(() => {
    observer.next(3);
    observer.next(4);
    observer.complete();
  }, 100);
});

const sub = observable.subscribe(observer);

setTimeout(() => {
  // ok we only subscribe for 100ms
  sub.unsubscribe();
}, 50);

/*
  Output:
    we got a value 1
    we got a value 2
  */
