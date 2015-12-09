var autorequire;
(function (autorequire) {
    var gl;
    (function (gl) {
        var DummyUtil;
        (function (DummyUtil) {
            function isObject(obj) {
                return (typeof obj === "object" && obj !== null);
            }
            DummyUtil.isObject = isObject;
            function isBoolean(obj) {
                return (typeof obj === "boolean");
            }
            DummyUtil.isBoolean = isBoolean;
            function isNumber(obj) {
                return (typeof obj === "number");
            }
            DummyUtil.isNumber = isNumber;
            function isNullOrUndefined(obj) {
                return (typeof obj === "undefined" || obj === null);
            }
            DummyUtil.isNullOrUndefined = isNullOrUndefined;
            function isNull(obj) {
                return obj === null;
            }
            DummyUtil.isNull = isNull;
            function isUndefined(obj) {
                return typeof obj === "undefined";
            }
            DummyUtil.isUndefined = isUndefined;
            function isFunction(obj) {
                return (typeof obj === "function");
            }
            DummyUtil.isFunction = isFunction;
            function isArray(obj) {
                return (Object.prototype.toString.call(obj) === "[object Array]");
            }
            DummyUtil.isArray = isArray;
            function isString(obj) {
                return (Object.prototype.toString.call(obj) === "[object Array]");
            }
            DummyUtil.isString = isString;
            function isDate(obj) {
                return (Object.prototype.toString.call(obj) === "[object Date]");
            }
            DummyUtil.isDate = isDate;
        })(DummyUtil = gl.DummyUtil || (gl.DummyUtil = {}));
    })(gl = autorequire.gl || (autorequire.gl = {}));
})(autorequire || (autorequire = {}));
var DummyUtil = autorequire.gl.DummyUtil;
//# sourceMappingURL=DummyUtil.js.map