/*
 * @Author: JL
 * @Date: 2021-12-31 18:00:21
 */
import { Node } from "cc";
import { resources } from "cc";
import { Prefab } from "cc";
import { instantiate } from "cc";
import { path } from "cc";
import { Vec3 } from "cc";
import { sys } from "cc";
import { BaseScene } from "../base/BaseScene";
import { EEventEnum } from "../data/enums/EventEnums";



/**
 * 场景名称
 *
 * @export
 * @enum {number}
 */
export enum ESceneName {
    SCENE_LOGIN = "SCENE_LOGIN",            // 登录
}

// ========================================================================================

/**
 * 场景数据结构
 *
 * @export
 * @interface ISceneData
 */
export interface ISceneData {
    // scene 名字
    sceneName: ESceneName;
    // 除通用资源目录外，引用的资源目录，没有可不填
    resDirs: string[];
    // 创建界面所需的 prefab
    prefabUrl: string;
}
// ========================================================================================
/**
* 切换场景
*
* @export
* @interface ISwitchSceneData
*/
export interface ISwitchSceneData {
    from?: ESceneName;
    to: ESceneName;
}

// ========================================================================================



/**
 * 场景管理器
 *
 * @export
 * @class SceneManager
 */
export default class SceneManager {
    /** 场景根节点 */
    private sceneRootNode: Node = null;
    /** 当前运行的场景数据 */
    private currentSceneData: ISceneData = null;
    /** 正在前往的场景数据 */
    private goingSceneData: ISceneData = null;
    /** 当前运行的尝试实例 */
    private currentScene: BaseScene = null;

    public async setup() {
        GFM.LogMgr.log("SceneManager setup");
    }

    public setSceneRootNode(node: Node) {
        this.sceneRootNode = node;
    }

    /**
     * 切换场景
     *
     * @param sceneData
     * @param [userData]
     * @returns {*}
     * @memberof SceneManager
     */
    private async prepareScene(sceneData: ISceneData, params?: Record<string, unknown>): Promise<void> {
        if (this.goingSceneData) {
            console.error(`scene [${this.goingSceneData.sceneName}] is going now`);
            return;
        }
        this.goingSceneData = sceneData;
        if (this.currentSceneData && this.currentSceneData.sceneName === sceneData.sceneName) {
            console.error(`scene [${this.currentSceneData.sceneName}] is runing now`);
            return;
        }
        const currentSceneResDirs = this.currentSceneData ? this.currentSceneData.resDirs : [];
        const needReleaseResDirs = this.difference(currentSceneResDirs, sceneData.resDirs);
        const needLoadResDirs = this.difference(sceneData.resDirs, currentSceneResDirs);
        try {
            GFM.showWaiting(`gotoScene: ${sceneData.sceneName}`);
            // 加载资源
            await GFM.ResMgr.loadDirs(needLoadResDirs, percent => {
                let number = Number(percent * 100).toFixed(0);
                GFM.EventMgr.emit(EEventEnum.LOADING_PROGRESS, { tid: `TID_LOADING_1,${number}`, pro: percent });
            });
            // 创建场景
            const prefab = resources.get<Prefab>(sceneData.prefabUrl, Prefab);
            const node = instantiate(prefab);
            node.name = path.basename(sceneData.prefabUrl);
            node.position = Vec3.ZERO;
            node.parent = this.sceneRootNode;
            const newScene = node.getComponent(BaseScene);
            GFM.EventMgr.emit(EEventEnum.LOADING_AUTO_PROGRESS);
            await newScene.willEnter(params);
            GFM.EventMgr.emit(EEventEnum.LOADING_PROGRESS, { tid: `TID_LOADING_1,100`, pro: 1 });
            newScene.didEnter(params);
            // 切换场景通知
            GFM.EventMgr.emit(EEventEnum.SWITCH_SCENE, {
                from: this.currentSceneData ? this.currentSceneData.sceneName : null,
                to: sceneData.sceneName,
            });
            // 释放资源
            if (this.currentScene) {
                await this.currentScene.willExit();
                this.currentScene.didExit();
                this.currentScene.node.destroy();
            }
            GFM.ResMgr.releaseDirs(needReleaseResDirs);
            this.currentSceneData = sceneData;
            this.currentScene = newScene;

        } catch (e) {
            console.error(e);
        } finally {
            // GFM.AssetManager.dumpDirMap();
            this.goingSceneData = null;
            // GFM.LogMgr.log('场景切换结束');
            GFM.EventMgr.emit(EEventEnum.LOADING_HIDE);
            // 切换场景通知
            GFM.EventMgr.emit(EEventEnum.SWITCH_SCENE_END);
            GFM.hideWaiting(`gotoScene: ${sceneData.sceneName}`);
            sys.garbageCollect();
        }
    }

    public async gotoScene(sceneName: ESceneName, params?: any) {
        switch (sceneName) {
            case ESceneName.SCENE_LOGIN: {
                await this.prepareScene({
                    sceneName: sceneName,
                    resDirs: [
                        "Prefab/Scene/LoginScene"
                    ],
                    prefabUrl: "Prefab/Scene/LoginScene",
                }, params);
            }
                break;
        }
    }

    public hideScene() {
        this.currentScene.node.active = false;
    }

    public showScene() {
        this.currentScene.node.active = true;
    }

    public getCurScene() {
        return this.currentScene;
    }

    public getCurSceneData() {
        return this.currentSceneData;
    }

    // 获取当前场景名 （正在前往的场景）
    public getCurSceneName() {
        if (this.goingSceneData) {
            return this.goingSceneData.sceneName;
        }
        else {
            return this.currentSceneData.sceneName;
        }
    }

    public isChangingScene() {
        return this.goingSceneData != null;
    }

    private difference(a: string[], b: string[]): string[] {
        const c: string[] = [];
        a.forEach((o) => {
            if (b.findIndex((o1) => o1 === o) === -1) {
                c.push(o);
            }
        });
        return c;
    }
}
