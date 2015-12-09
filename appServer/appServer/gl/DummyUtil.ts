module autorequire.gl.DummyUtil {
    
    export function isObject(obj: any) {
        return (typeof obj === "object" && obj !== null);
    }

    export function isBoolean(obj: any) {
        return (typeof obj === "boolean");
    }

    export function isNumber(obj: any) {
        return (typeof obj === "number");
    }

    export function isNullOrUndefined(obj: any) {
        return (typeof obj === "undefined" || obj === null);
    }

    export function isNull(obj: any) {
        return obj === null;
    }

    export function isUndefined(obj: any) {
        return typeof obj === "undefined";
    }

    export function isFunction(obj: any) {
        return (typeof obj === "function");
    }

    export function isArray(obj: any) {
        return (Object.prototype.toString.call(obj) === "[object Array]");
    }

    export function isString(obj: any) {
        return (Object.prototype.toString.call(obj) === "[object Array]");
    }

    export function isDate(obj: any) {
        return (Object.prototype.toString.call(obj) === "[object Date]");
    }

}

var DummyUtil = autorequire.gl.DummyUtil;
