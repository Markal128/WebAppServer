import Events = require("events");
import fs = require("fs");

module app.connector {

    export class Connector extends Events.EventEmitter {
        private server: any;
        private name: string;
        private host: string;
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
                
            } else if (type === "handle") {
                
            } else if (type === "") {
                
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
}
