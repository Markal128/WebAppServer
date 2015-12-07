var autorequire;
(function (autorequire) {
    var gl;
    (function (gl) {
        var TimeUtil;
        (function (TimeUtil) {
            /**
             * 返回当前时间的毫秒数
             * @returns {}
             */
            function getTimeStampMs() {
                return Date.now();
            }
            TimeUtil.getTimeStampMs = getTimeStampMs;
        })(TimeUtil = gl.TimeUtil || (gl.TimeUtil = {}));
    })(gl = autorequire.gl || (autorequire.gl = {}));
})(autorequire || (autorequire = {}));
var TimeUtil = autorequire.gl.TimeUtil;
//# sourceMappingURL=TimeUtil.js.map