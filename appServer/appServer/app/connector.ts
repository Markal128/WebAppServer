import Events = require("events");
import fs = require("fs");
import util = require("util");
const express = require("express");
const bodyParser = require("body-parser");

module autorequire.connector {

    export class Connector extends Events.EventEmitter {
        private server: any;
        private name: string;
        private host: string;
        private port: number;
        private type: string;
        private handler_type: any;
        private handler_get: any;
        private handler_post: any;
        
        constructor() {
            super();
            this.handler_type = {};
            this.handler_get = {};
            this.handler_post = {};
            this.handler_type["get"] = this.handler_get;
            this.handler_type["post"] = this.handler_post;
        }

        configure(type: string, config: any) {
            if (typeof config === "string") {
                config = JSON.parse(fs.readFileSync(config, "utf8"));
            }

            if (type === "server") {
                const cfgs = config.web;
                this.type = cfgs.type;
                this.name = cfgs.name;
                this.host = cfgs.host;
                this.port = cfgs.port;
            } else if (type === "handle") {
                for (let i in config) {
                    if (config.hasOwnProperty(i)) {
                        this.loadHandles(config[i]);
                    }
                }
            } else if (type === "") {
                
            }
        }

        private loadHandles(opts: any) {
            const path = util.format("%s/../handles/%s", __dirname, opts.path);
            const handler = require(path);
            if (opts.type === "get") {
                if (this.addHandlerGet(opts, handler)) {
                    console.log("addHandlerGet OK! [ %s ] url[ %s ] path[ %s ]", opts.type, opts.url, opts.path);
                } else {
                    console.log("addHandlerGet Fail! [ %s ] url[ %s ] path[ %s ]", opts.type, opts.url, opts.path);
                }
            } else if (opts.type === "post") {
                if (this.addHandlerPost(opts, handler)) {
                    console.log("addHandlerPost OK! [ %s ] url[ %s ] path[ %s ]", opts.type, opts.url, opts.path);
                } else {
                    console.log("addHandlerPost Fail! [ %s ] url[ %s ] path[ %s ]", opts.type, opts.url, opts.path);
                }
            } else if (opts.type === "all") {
                if (this.addHandlerGet(opts, handler) && this.addHandlerPost(opts, handler)) {
                    console.log("addHandlerGet and addHandlerPost OK! [ %s ] url[ %s ] path[ %s ]", opts.type, opts.url, opts.path);
                } else {
                    console.log("addHandlerGet and addHandlerPost Fail! [ %s ] url[ %s ] path[ %s ]", opts.type, opts.url, opts.path);
                }
            } else {
                console.log("Type is error! [ %s ] url[ %s ] path[ %s ]", opts.type, opts.url, opts.path);
            }
        }

        private addHandlerGet(opts: any, handler: any) {
            let func: any = null;
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
        }

        private addHandlerPost(opts: any, handler: any) {
            let func: any = null;
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
        }

        private createHttpServer() {
            this.server = express();

            this.server.use(bodyParser.json({ limit: "1mb" }));  //这里指定参数使用 json 格式
            this.server.use(bodyParser.urlencoded({
                extended: true
            }));

            this.server.on("error", (err: any) => {
                console.error("app on error: %s", err.stack);
            });

            const handlerGet = this.handler_get;
            for (let url in handlerGet) {
                if (handlerGet.hasOwnProperty(url)) {
                    this.createHanler(url);
                }
            }

            this.server.post("*", (req: any, res: any) => {
                var endcb = function (body: any) {
                    if (!body) {
                        body = { code: 200 };
                    }
                    res.end(JSON.stringify(body) + "\n", "utf8");
                };
                var clientip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
                console.log("receive clientip[%s] method=[%s]: url=%s", clientip, req.method, req.url);

                var url = req.url;
                var args = req.body;
                this.httpMessage(url, args, "post", req, res, endcb);
            });

            this.server.listen(this.port, this.host || "127.0.0.1");
            console.log("create %s server is OK.  http://%s:%d", this.type, this.host, this.port);

        }

        private createHanler(url: string) {
            this.server.get(url, (req: any, res: any) => {
                const endcb = (body: any) => {
                    if (!body) {
                        body = { code: 200 };
                    }
                    res.end(JSON.stringify(body) + "\n", "utf8");
                };
                const clientip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
                console.log("receive clientip=[%s] method=[%s]: url=%s", clientip, req.method, req.url);

                const args = req.query;
                this.httpMessage(url, args, "get", req, res, endcb);
            });
        }

        private httpMessage(urlpath: string, args: any, type: any, req: any, res: any, endcb: Function) {
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
            } catch (e) {
                console.error("try parseMessage %s", e);
                endcb();
            } 
        }

        start(cb: (err: any) => void) {
            cb(null);
        }

        stop(cb: (err: any) => void) {
            if (this.server) {
                this.server.close();
                this.server = null;
            }
        }

    }

    (module).exports = () => {
        return new Connector();
    };

}
