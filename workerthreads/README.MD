## Worker threads
This is a tiny demonstration of the way worker threads work. When we have a CPU-blocking process (the sort of thing that cannot be delegated — via libuv — to the event queue), we block the whole Node thread, and this can cause the server/application to become unresponsive.

Fortunately, Node provides us with the option of spinning up a worker thread. The Worker Thread constructor inherits from `EventEmitter` allowing the parent process to listen for events from the worker, so it can take action when the task is done.

This repository contains a small NodeJS server that has three endpoints:

1. Simple: a light, non-intensive server request.
2. Heavy, blocking: A heavy request that blocks the JavaScript thread for a while. When you hit this endpoint, you'll notice that you're unable to get a response if you then try the Simple endpoint.
3. Heavy, non-blocking: Same as the heavy request, without small change: the compute-intensive task is delegated to a worker thread.

## To use 
1. Clone this repository, and `cd` into the `workerthreads` folder.
2. Run npm i to install dependencies (just express in this case);
3. Run `npm run start` to spin up the server.
4. Hit the three endpoints to see what happens. 

## Acknowledgment
Thanks to Akilesh Rao's [brilliant article](https://javascript.plainenglish.io/a-brief-guide-on-worker-threads-in-node-js-80bd1e7846cb) for explaining worker threads