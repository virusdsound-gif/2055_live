const Runtime = require("../core/runtime");

const stream = new Runtime();

stream.start();

stream.join();
stream.join();

stream.burn(0.5);

console.log(stream.status());
