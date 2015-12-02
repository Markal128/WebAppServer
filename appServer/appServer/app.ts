var connector = require("./app/connector.js");
var config = require("./cfgs/config.json");

const server = new connector();

server.configure("server", config);
server.configure("handle", __dirname + "/cfgs/handle.json");

server.start((err: any) => {
    if (err) {
        process.exit(0);
        return;
    }
    console.log("http server start ok.");
});

