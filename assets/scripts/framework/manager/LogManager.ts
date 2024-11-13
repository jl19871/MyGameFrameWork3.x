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
        // window.cc.log("%c文字332322323"+"color:#84b397"+"asfasfsadf"); 
        console.log("【GFM log 打印】", ...arg);
    }
    /**
     * @zh 打印回调重写
     * @param arg 
     */
    public error(...arg) {
        // window.cc.log("%c文字332322323"+"color:#84b397"+"asfasfsadf"); 
        console.error("【GFM error 打印】", ...arg);
    }
    /**
     * @zh 打印回调重写
     * @param arg 
     */
    public warn(...arg) {
        // window.cc.log("%c文字332322323"+"color:#84b397"+"asfasfsadf"); 
        console.warn("【【GFM warn 打印】", ...arg);
    }
    /**
     * @zh 打印详细信息
     * @param arg 
     */
    public dump(arg) {
        console.log("【GFM dump 打印】" + JSON.stringify(arg));
    }
}