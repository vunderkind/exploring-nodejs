let cp = require("child_process");
let child = cp.fork(__dirname + "/lovechild.js");


child.on("message", (message) => {
	console.log(`Child said: ${message}`);
});

child.send("I love you!");
