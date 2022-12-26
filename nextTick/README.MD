## process.nextTick()
This one is a bit tricky to describe, but I think a good way to explain it is to remember how `setTimeout()` works.

If you have `setTimeout()` in your code, you expect that the code will run, register the timeout, then continue running, after which the event loop will run (after the allotted time), and fire the callback set up by setTimeout.

As an arrow, it goes:

```JavaScript
JavaScript Code -> SetTimeout registered -> More JavaScript Code -> JavaScript code done -> Event queue wait alloted time -> Pops callback on to the stack -> Callback runs.
```

NextTick functions like this except for one thing:
1. It runs before IO callbacks, timers (so, before setTimeout) and
2. It runs after the main JavaScript code (just like setTimeout). 

## Why would we use it, then?
In a nutshell, we use it to design our asynchronous behavior, especially around events. Sometimes we have behavior that is so fast we could miss it if we don't schedule it with a nextTick() action. Say we're listening for an event to be emitted, and we want to set up a handler for that event. What happens if the event is emitted before we can set up the handler? We'll always miss the event, and never be able to react to it, like in this example:

```JavaScript
    const events = require('events');
    function getEmitter() {
        let emitter = new events.EventEmitter();
        emitter.emit('start');
        return emitter;
    }

    let myEmitter = getEmitter();

    myEmitter.on('start', () () => {
        console.log('started!');
    })
```

To fix this, we can use `process.nextTick()`:

```JavaScript
    const events = require('events');
    function getEmitter() {
        let emitter = new events.EventEmitter();
        process.nextTick(() => {
        emitter.emit('start');
        })
        return emitter;
    }

    let myEmitter = getEmitter();

    myEmitter.on('start', () => {
        console.log('started!');
    })
```

This piece of code works because we are then able to attach the handler (in the natural course of the JavaScript code running) before the emitter emits 'start'.