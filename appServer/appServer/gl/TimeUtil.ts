module autorequire.gl.TimeUtil {
    
    /**
     * 返回当前时间的毫秒数
     * @returns {} 
     */
    export function getTimeStampMs(): number {
        return Date.now();
    }


}

var TimeUtil = autorequire.gl.TimeUtil;
