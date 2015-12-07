module autorequire.gl.MathUtil {

    export function divFloorNumber(x: number, y: number) {
        return Math.floor(x / y);
    }

    export function modNumber(x: number, y: number) {
        return (x % y);
    }

    export function divRoundNumber(x: number, y: number) {
        return Math.round(divFloorNumber(x, y));
    }

}

var MathUtil = autorequire.gl.MathUtil;
