/*
 * @Author: JL
 * @Date: 2024-11-12 17:04:42
 */
export default class LogManager {

    public async setup() {
        this.log("LogManager setup");
    }

    /**
    * @zh 打印回调重写
    * @param arg 
    */
    public log(...arg) {
        console.log("【GFM log】", ...arg);
    }
    /**
     * @zh 打印回调重写
     * @param arg 
     */
    public error(...arg) {
        console.error("【GFM error】", ...arg);
    }
    /**
     * @zh 打印回调重写
     * @param arg 
     */
    public warn(...arg) {
        console.warn("【GFM warn】", ...arg);
    }
    /**
     * @zh 打印详细信息
     * @param arg 
     */
    public dump(arg) {
        console.log("【GFM dump Start】----------------------------------------");
        console.table(arg);
        console.log("【GFM dump End】----------------------------------------");
    }
}