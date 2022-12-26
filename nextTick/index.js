//See readme for notes
//Uncomment each code separately to see how they behave


// Bad implementation with 
const events = require('events');
function getEmitter() {
    let emitter = new events.EventEmitter();
    emitter.emit('start');
    return emitter;
}

let myEmitter = getEmitter();

myEmitter.on('start', () => {
    console.log('started!');
})

//Good implementation — with process.nextTick()!
// const events = require('events');
// function getEmitter() {
//     let emitter = new events.EventEmitter();
//     process.nextTick(() => {
//     emitter.emit('start');
//     })
//     return emitter;
// }

// let myEmitter = getEmitter();

// myEmitter.on('start', () => {
//     console.log('started!');
// })