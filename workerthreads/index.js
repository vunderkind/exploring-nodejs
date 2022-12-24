const { Worker } = require('worker_threads');
const app = require('express')();
const PORT = process.env.PORT || 3000;


app.get('/simple', async (req, res) => {
    res.send(`All good here!`);
});

app.get('/heavyblocking', async (req, res) => {
    let jobSize = 9_000_000_000;
    let count = 0;

    const start = Date.now();

    while (count < jobSize) {
        count++;
    }

    const end = Date.now();

    const difference = (end -start)/1000;

    res.send(`Blocked the thread for ${difference} seconds, with ${count} jobs done!`);

    //Hit this endpoint, then hit the '/simple' endpoint.
    // Notice how the /simple endpoint is frozen, waiting for the job to be done first,

});

app.get('/heavynonblocking', async (req, res) => {
    const worker = new Worker("./jobWorker.js");

    worker.on('message', message => {
        res.send(message);
    })

    // Hit this endpoint, then hit /simple
    // You'll notice that even though this is still running,
    // it does not block the /simple endpoint, because it has
    // delegated the job to a different (worker) thread. 

})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})