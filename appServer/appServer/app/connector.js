var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Events = require("events");
var fs = require("fs");
var util = require("util");
var express = require("express");
var bodyParser = require("body-parser");
var autorequire;
(function (autorequire) {
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
                    var cfgs = config.web;
                    this.type = cfgs.type;
                    this.name = cfgs.name;
                    this.host = cfgs.host;
                    this.port = cfgs.port;
                }
                else if (type === "handle") {
                    for (var i in config) {
                        if (config.hasOwnProperty(i)) {
                            this.loadHandles(config[i]);
                        }
                    }
                }
                else if (type === "") {
                }
            };
            Connector.prototype.loadHandles = function (opts) {
                var path = util.format("%s/../handles/%s", __dirname, opts.path);
                var handler = require(path);
                if (opts.type === "get") {
                    if (this.addHandlerGet(opts, handler)) {
                        console.log("addHandlerGet OK! [ %s ] url[ %s ] path[ %s ]", opts.type, opts.url, opts.path);
                    }
                    else {
                        console.log("addHandlerGet Fail! [ %s ] url[ %s ] path[ %s ]", opts.type, opts.url, opts.path);
                    }
                }
                else if (opts.type === "post") {
                    if (this.addHandlerPost(opts, handler)) {
                        console.log("addHandlerPost OK! [ %s ] url[ %s ] path[ %s ]", opts.type, opts.url, opts.path);
                    }
                    else {
                        console.log("addHandlerPost Fail! [ %s ] url[ %s ] path[ %s ]", opts.type, opts.url, opts.path);
                    }
                }
                else if (opts.type === "all") {
                    if (this.addHandlerGet(opts, handler) && this.addHandlerPost(opts, handler)) {
                        console.log("addHandlerGet and addHandlerPost OK! [ %s ] url[ %s ] path[ %s ]", opts.type, opts.url, opts.path);
                    }
                    else {
                        console.log("addHandlerGet and addHandlerPost Fail! [ %s ] url[ %s ] path[ %s ]", opts.type, opts.url, opts.path);
                    }
                }
                else {
                    console.log("Type is error! [ %s ] url[ %s ] path[ %s ]", opts.type, opts.url, opts.path);
                }
            };
            Connector.prototype.addHandlerGet = function (opts, handler) {
                var func = null;
                if (typeof handler.get === "function") {
                    func = handler.get;
                }
                if (typeof handler.handle === "function" && !func) {
                    func = handler.handle;
                }
                if (func) {
                    this.on("get" + opts.url, func);
                    this.handler_get[opts.url] = func;
                    return true;
                }
                return false;
            };
            Connector.prototype.addHandlerPost = function (opts, handler) {
                var func = null;
                if (typeof handler.post === "function") {
                    func = handler.post;
                }
                if (typeof handler.handle === "function" && !func) {
                    func = handler.handle;
                }
                if (func) {
                    this.on("post" + opts.url, func);
                    this.handler_post[opts.url] = func;
                    return true;
                }
                return false;
            };
            Connector.prototype.createHttpServer = function () {
                var _this = this;
                this.server = express();
                this.server.use(bodyParser.json({ limit: "1mb" })); //这里指定参数使用 json 格式
                this.server.use(bodyParser.urlencoded({
                    extended: true
                }));
                this.server.on("error", function (err) {
                    console.error("app on error: %s", err.stack);
                });
                var handlerGet = this.handler_get;
                for (var url in handlerGet) {
                    if (handlerGet.hasOwnProperty(url)) {
                        this.createHanler(url);
                    }
                }
                this.server.post("*", function (req, res) {
                    var endcb = function (body) {
                        if (!body) {
                            body = { code: 200 };
                        }
                        res.end(JSON.stringify(body) + "\n", "utf8");
                    };
                    var clientip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
                    console.log("receive clientip[%s] method=[%s]: url=%s", clientip, req.method, req.url);
                    var url = req.url;
                    var args = req.body;
                    _this.httpMessage(url, args, "post", req, res, endcb);
                });
                this.server.listen(this.port, this.host || "127.0.0.1");
                console.log("create %s server is OK.  http://%s:%d", this.type, this.host, this.port);
            };
            Connector.prototype.createHanler = function (url) {
                var _this = this;
                this.server.get(url, function (req, res) {
                    var endcb = function (body) {
                        if (!body) {
                            body = { code: 200 };
                        }
                        res.end(JSON.stringify(body) + "\n", "utf8");
                    };
                    var clientip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
                    console.log("receive clientip=[%s] method=[%s]: url=%s", clientip, req.method, req.url);
                    var args = req.query;
                    _this.httpMessage(url, args, "get", req, res, endcb);
                });
            };
            Connector.prototype.httpMessage = function (urlpath, args, type, req, res, endcb) {
                if (urlpath === "/test") {
                    var text = util.format("[ %s-Server ]test connect succeed!", this.name);
                    endcb({ code: text });
                    return;
                }
                try {
                    if (this.handler_type[type][urlpath]) {
                        console.log("[ %s-Server ] url[ %s ] data[ %s ]", this.name, urlpath, JSON.stringify(args));
                        this.emit(type + urlpath, args, req, res, endcb);
                    }
                    else {
                        console.error("[ %s-Server ] Unknowed Message urlpath[ %s ] data[ %s ]", this.name, urlpath, JSON.stringify(args));
                        endcb({ error: "Unknowed Message[" + urlpath + "]" });
                    }
                }
                catch (e) {
                    console.error("try parseMessage %s", e);
                    endcb();
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
        (module).exports = function () {
            return new Connector();
        };
    })(connector = autorequire.connector || (autorequire.connector = {}));
})(autorequire || (autorequire = {}));
//# sourceMappingURL=connector.js.map