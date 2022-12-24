const { parentPort } = require('worker_threads');
let count = 0;
let jobSize = 9_000_000_000;

while (count < jobSize) {
    count ++;
}

parentPort.postMessage(`Finished, with ${count} jobs done!`);