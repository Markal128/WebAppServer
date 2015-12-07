var autorequire;
(function (autorequire) {
    var gl;
    (function (gl) {
        var MathUtil;
        (function (MathUtil) {
            function divFloorNumber(x, y) {
                return Math.floor(x / y);
            }
            MathUtil.divFloorNumber = divFloorNumber;
            function modNumber(x, y) {
                return (x % y);
            }
            MathUtil.modNumber = modNumber;
            function divRoundNumber(x, y) {
                return Math.round(divFloorNumber(x, y));
            }
            MathUtil.divRoundNumber = divRoundNumber;
        })(MathUtil = gl.MathUtil || (gl.MathUtil = {}));
    })(gl = autorequire.gl || (autorequire.gl = {}));
})(autorequire || (autorequire = {}));
var MathUtil = autorequire.gl.MathUtil;
//# sourceMappingURL=MathUtil.js.map