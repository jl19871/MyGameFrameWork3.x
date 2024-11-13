/*
 * @Author: JL
 * @Date: 2024-11-12 17:15:56
 */
import { GFM } from "./framework/GFM";

/**
 * 全局声明 防止频繁引入
 */
declare global {
    var GFM: GFM & {

    };
}

declare global {
    interface Window {
        GFM: GFM;
    }
}

