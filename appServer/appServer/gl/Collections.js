var autorequire;
(function (autorequire) {
    var gl;
    (function (gl) {
        var collections;
        (function (collections) {
            function parseHashKey(key) {
                return "";
            }
            collections.parseHashKey = parseHashKey;
            function parseHashValue(key, value) {
                if (key.startWith("$n")) {
                    return parseInt(key.substring(2));
                }
                else if (key.startWith("$s")) {
                    return key.substring(2);
                }
                else if (key.startWith("$o")) {
                    return value;
                }
            }
            collections.parseHashValue = parseHashValue;
            var HashMap = (function () {
                function HashMap() {
                    this.table = {};
                    this.nElements = 0;
                }
                HashMap.prototype.get = function (key) {
                    return this.get(key);
                };
                HashMap.prototype.put = function (key, value) {
                    if (gl.DummyUtil.isUndefined(key) && gl.DummyUtil.isUndefined(value)) {
                        return undefined;
                    }
                    var ret;
                    return ret;
                };
                HashMap.prototype.remove = function (key) {
                    return this.get(key);
                };
                HashMap.prototype.keys = function () {
                    return [];
                };
                HashMap.prototype.values = function () {
                    return [];
                };
                HashMap.prototype.forEach = function () {
                    return true;
                };
                HashMap.prototype.containsKey = function (key) {
                    return true;
                };
                HashMap.prototype.clear = function () {
                };
                HashMap.prototype.size = function () {
                    return 1;
                };
                HashMap.prototype.isEmpty = function () {
                    return true;
                };
                HashMap.prototype.formatToString = function () {
                    return "";
                };
                HashMap.prototype.print = function () {
                    return "";
                };
                return HashMap;
            })();
            collections.HashMap = HashMap;
        })(collections = gl.collections || (gl.collections = {}));
    })(gl = autorequire.gl || (autorequire.gl = {}));
})(autorequire || (autorequire = {}));
var collections = autorequire.gl.collections;
//# sourceMappingURL=Collections.js.map