require("./gl/GlobalInit");
var connector = require("./app/connector.js");
var config = require("./cfgs/config.json");
var server = new connector();
server.configure("server", config);
server.configure("handle", __dirname + "/cfgs/handle.json");
server.start(function (err) {
    if (err) {
        process.exit(0);
        return;
    }
    console.log("http server start ok.");
});
//# sourceMappingURL=app.js.map