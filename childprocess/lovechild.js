process.on("message", m => {
	console.log(`Parent said: ${m}`);
	process.send("I love you too");
});
