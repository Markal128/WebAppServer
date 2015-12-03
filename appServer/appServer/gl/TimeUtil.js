var app;
(function (app) {
    var gl;
    (function (gl) {
        var TimeUtil;
        (function (TimeUtil) {
            function getTimeStampMs() {
                return Date.now();
            }
            TimeUtil.getTimeStampMs = getTimeStampMs;
        })(TimeUtil = gl.TimeUtil || (gl.TimeUtil = {}));
    })(gl = app.gl || (app.gl = {}));
})(app || (app = {}));
var TimeUtil = app.gl.TimeUtil;
//# sourceMappingURL=TimeUtil.js.map