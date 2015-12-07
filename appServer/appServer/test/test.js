// ReSharper disable once CommonJsExternalModule
require("../gl/GlobalInit");
var curTime = TimeUtil.getTimeStampMs();
console.log("curTime = ", curTime);
console.log("%s / %s = %s <--->", 1, 3, MathUtil.divFloorNumber(1, 3), Math.floor(1 / 3));
console.log("%s / %s = %s", 2, 3, MathUtil.divFloorNumber(2, 3));
console.log("%s / %s = %s", 3, 3, MathUtil.divFloorNumber(3, 3));
console.log("%s % %s = %s, ------ %s", 100, 9, MathUtil.modNumber(100, 9), (100 % 9));
console.log("%s % %s = %s, ------ %s", 90, 9, MathUtil.modNumber(90, 9), (90 % 9));
console.log("%s % %s = %s, ------ %s", 3, 9, MathUtil.modNumber(3, 9), (3 % 9));
function aaa() {
}
var a = [];
var b = new Array();
console.log("a instanceof Array ", a instanceof Array);
console.log("b instanceof Array ", b instanceof Array);
console.log("a.constructor= ", a.constructor === Array);
console.log("b.constructor= ", b.constructor === Array);
console.log("a =%s", Object.prototype.toString.call(""));
console.log("a =%s", Object.prototype.toString.call([]));
console.log("a =%s", Object.prototype.toString.call(null));
console.log("a =%s", Object.prototype.toString.call(0));
console.log("a =%s", Object.prototype.toString.call(1));
console.log("a =%s", Object.prototype.toString.call(undefined));
console.log("a =%s", Object.prototype.toString.call(true));
console.log("a =%s", Object.prototype.toString.call({}));
console.log("a =%s", Object.prototype.toString.call(aaa));
console.log("DummyUtil.isNullOrUndefined(null)=", DummyUtil.isNullOrUndefined(null));
console.log("DummyUtil.isNullOrUndefined(undefined)=", DummyUtil.isNullOrUndefined(undefined));
console.log("DummyUtil.isNullOrUndefined(0)=", DummyUtil.isNullOrUndefined(0));
console.log("DummyUtil.isNullOrUndefined('')=", DummyUtil.isNullOrUndefined(""));
console.log("DummyUtil.isNullOrUndefined(false)=", DummyUtil.isNullOrUndefined(false));
console.log("DummyUtil.isNullOrUndefined([])=", DummyUtil.isNullOrUndefined([]));
//# sourceMappingURL=test.js.map