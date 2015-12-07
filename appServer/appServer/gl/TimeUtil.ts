module autorequire.gl.TimeUtil {
    
    export function getTimeStampMs(): number {
        return Date.now();
    }
}

var TimeUtil = autorequire.gl.TimeUtil;
