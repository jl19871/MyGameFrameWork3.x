import { EEventEnum } from "./data/enums/EventEnums";
import AudioManager from "./manager/AudioManager";
import DataManager from "./manager/DataManager";
import EventManager from "./manager/EventManager";
import LogManager from "./manager/LogManager";
import ResManager from "./manager/ResManager";
import SceneManager from "./manager/SceneManager";
import UIManager from "./manager/UIManager";
import HttpClient from "./newwork/HttpClient";

/**
 * 游戏统一调度 Game Framework Module
 */
export class GFM {
    // 单例全部在此初始化
    private instances: Map<{ new() }, Object> = new Map<{ new() }, Object>();

    private static _instance: GFM = null;

    public static getInstance(): GFM {
        if (this._instance === null) {
            this._instance = new GFM();
        }
        return this._instance;
    }

    constructor() {
    }

    /** 资源管理器 */
    public get ResMgr(): ResManager {
        return this.getInstance(ResManager);
    }

    // /** 音频管理器 */
    public get AudioMgr(): AudioManager {
        return this.getInstance(AudioManager);
    }

    /** 全局通知工具 */
    public get EventMgr(): EventManager {
        return this.getInstance(EventManager);
    }

    // // /** 网络工具 */
    // public get WebManager(): Network {
    //   return GFM.getInstance(Network);
    // }

    /** 数据模型管理器 */
    public get DataMgr(): DataManager {
        return this.getInstance(DataManager);
    }

    /** 场景管理器 */
    public get SceneMgr(): SceneManager {
        return this.getInstance(SceneManager);
    }

    /** UI 管理器 */
    public get UIMgr(): UIManager {
        return this.getInstance(UIManager);
    }

    /** http 管理器 */
    public get HttpMgr(): HttpClient {
        return this.getInstance(HttpClient);
    }

    public get LogMgr(): LogManager {
        return this.getInstance(LogManager);
    }

    // public get HeartBeatManager(): HeartBeatManager {
    //   return this.getInstance(HeartBeatManager);
    // }

    // public get IMManager(): IMManager {
    //   return this.getInstance(IMManager);
    // }

    /** 游戏工具类 */
    // public get GameUtil(): GameUtil {
    //     return GameUtil.getInstance();
    // }

    // public get SDKManager(): SDKManager {
    //   return this.getInstance(SDKManager);
    // }


    // public clearAllMgr() {
    //   this.clearAll();
    // }

    // public async reloadSetting() {
    //   GameConfig.settingConfigs = null;
    //   Game.DataManager.res.clear();
    //   await Game.DataManager.res.setup();
    //   await Game.DataManager.lang.setup();
    //   await Game.AssetManager.reloadGameBundle();
    // }


    public showWaiting(reason: string) {
        this.EventMgr.emit(EEventEnum.BLOCK_INPUT_SHOW, reason);
    }

    public hideWaiting(reason: string) {
        this.EventMgr.emit(EEventEnum.BLOCK_INPUT_HIDE, reason);
    }


    public getInstance<T>(c: { new(): T }): T {
        if (!this.instances.has(c)) {
            let obj = new c();
            this.instances.set(c, obj);
            return obj;
        }
        return <T>this.instances.get(c);
    }

    public static clearAll() {

    }

    // public static connectToGameServer(urls?) {
    //   // if (urls == undefined) urls = this.DataManager.game.gameUrls;
    //   // if (urls.length == 0) {
    //   //   console.error("no IP");
    //   //   // generalFunc.reloadGame();
    //   //   Tools.reloadGame("TID_NETWORK_ERROR");
    //   //   return false;
    //   // }
    //   // // cmdCount = 1;
    //   // var index = Tools.getInt(0, urls.length - 1);
    //   // var ip = urls[index];
    //   // console.log("================  index = " + index + "  ip = " + ip);

    //   // this.WebManager.connect(ip);
    //   // return true;
    // }

    // public static sendMessage(data: any, _cmd?: number | boolean, _wait?: boolean) {
    //   if (this.WebManager.isSocketOpened()) {
    //     this.WebManager.send(data, _cmd, _wait);
    //   }
    //   else {

    //   }
    // }

    // public static async get(url: string, obj = null, waiting = true) {

    //     if (waiting) GFM.showWaiting("get " + url);
    //     let response = await GFM.HttpManager.get(url, obj);
    //     if (waiting) GFM.hideWaiting("get " + url);
    //     return response;
    // }

    // public static async post(url: string, obj: Record<string, unknown>, waiting = true, contentType: HTTP_CONTENT_TYPE = HTTP_CONTENT_TYPE.FORMDATA) {
    //     if (waiting) GFM.showWaiting("post " + url);
    //     let response = await GFM.HttpManager.post(url, obj, contentType);
    //     if (waiting) GFM.hideWaiting("post " + url);
    //     return response;
    // }
}



window['GFM'] = GFM.getInstance();
