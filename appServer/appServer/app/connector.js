var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Events = require("events");
var fs = require("fs");
var app;
(function (app) {
    var connector;
    (function (connector) {
        var Connector = (function (_super) {
            __extends(Connector, _super);
            function Connector() {
                _super.call(this);
                this.handler_type = {};
                this.handler_get = {};
                this.handler_post = {};
                this.handler_type["get"] = this.handler_get;
                this.handler_type["post"] = this.handler_post;
            }
            Connector.prototype.configure = function (type, config) {
                if (typeof config === "string") {
                    config = JSON.parse(fs.readFileSync(config, "utf8"));
                }
                if (type === "server") {
                }
                else if (type === "handle") {
                }
                else if (type === "") {
                }
            };
            Connector.prototype.start = function (cb) {
                cb(null);
            };
            Connector.prototype.stop = function (cb) {
                if (this.server) {
                    this.server.close();
                    this.server = null;
                }
            };
            return Connector;
        })(Events.EventEmitter);
        connector.Connector = Connector;
    })(connector = app.connector || (app.connector = {}));
})(app || (app = {}));
//# sourceMappingURL=connector.js.map