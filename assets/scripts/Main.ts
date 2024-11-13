/*
 * @Author: JL
 * @Date: 2024-11-12 17:27:22
 */
/**
 * 入口类
 */

import { _decorator, Component, Label, ProgressBar, ResolutionPolicy, Size, UITransform, view, screen, game, Game, Node, find, Canvas } from "cc";
import GameConfig from "./GameConfig";
import { ESceneName } from "./framework/manager/SceneManager";

const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component {
    @property({
        type: Node,
        tooltip: "场景添加节点",
    })
    private sceneRootNode: Node = null;

    @property({
        type: Node,
        tooltip: "弹出UI添加节点",
    })
    private uiRootNode: Node = null;

    @property({
        type: Node,
        tooltip: "屏蔽框节点",
    })
    private blockInputNode: Node = null;

    @property({
        type: Node,
        tooltip: "loading节点",
    })
    private loadingNode: Node = null;

    @property({
        type: Label,
        tooltip: "loading文本",
    })
    private lab_loading: Label = null;

    @property({
        type: ProgressBar,
        tooltip: "loading条",
    })
    private pro_loading: ProgressBar = null;

    @property({
        type: Label,
        tooltip: "测试按键屏蔽的状态文本",
    })

    // 添加
    @property({ tooltip: 'block动效' })
    @property(Node)
    ani_block: Node = null;

    @property(Label)
    private blockStateLabel: Label = null;
    private blockInputRefNum = 0;
    private blockReasons: string[] = [];

    private _curDR: Size = null;

    protected onLoad() {
        window["GameConfig"] = GameConfig;
        screen.on("window-resize", this.resizeCallBack, this);
        this.resize();

        // if (GameConfig.TEST) {
        //   cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.keyDown, this);
        // }
        game.on(Game.EVENT_HIDE, this.eventHide, this);
        game.on(Game.EVENT_SHOW, this.eventShow, this);

        this.loadingNode.active = true;
        this.updateBlockInput();
        this.blockStateLabel.node.active = GameConfig.TEST;

        GFM.SceneMgr.setSceneRootNode(this.sceneRootNode);
        GFM.UIMgr.setUIRootNode(this.uiRootNode);

        GFM.setup().then(() => {
            GFM.SceneMgr.gotoScene(ESceneName.SCENE_LOGIN);
        });

    }



    //#region block相关
    private showBlockInput(reason: string) {
        this.blockInputRefNum += 1;
        this.blockReasons.push(reason);
        this.updateBlockInput();
        GFM.LogMgr.log("blockinput block:", this.blockInputRefNum, reason);
    }

    private hideBlockInput(reason: string) {
        let index = this.blockReasons.findIndex((o) => o === reason);
        if (index != -1) {
            this.blockInputRefNum -= 1;
            this.blockReasons.splice(index, 1);
            this.updateBlockInput();
            GFM.LogMgr.log("blockinput allow:", this.blockInputRefNum, reason);
        }
    }

    private updateBlockInput() {
        this.unschedule(this.showWaiting);
        this.blockInputNode.active = this.blockInputRefNum > 0;
        if (this.ani_block) this.ani_block.active = false;
        if (this.blockInputNode.active) {
            this.scheduleOnce(this.showWaiting, 1);
        }
        if (!GameConfig.TEST) {
            return;
        }
        this.blockStateLabel.string = this.blockReasons.join("\n");
    }

    private clearBlockInput() {
        this.blockReasons = [];
        this.blockInputRefNum = 0;
        this.updateBlockInput();
    }

    private showWaiting() {
        if (this.ani_block) this.ani_block.active = this.blockInputNode.active;

    }
    //#endregion

    //#region 前后台切换
    private eventHide() {
        console.log("=====EVENT_HIDE");
        // GFM.AudioMgr.pauseAll();
        // Game.NotifyManager.emit(ENotifyType.EVENT_HIDE);

    }

    private eventShow() {
        console.log("=====EVENT_SHOW");
        // Game.AudioManager.resumeAll();
        // // 重新获取auth
        // NativeCallFuncs.getAuth();
        // Game.NotifyManager.emit(ENotifyType.EVENT_SHOW);
        // if (Game.WebManager && Game.WebManager.isSocketOpened()) {
        //   Game.HeartBeatManager.sendHeartBeat();
        // }
    }
    //#endregion

    //#region resize相关
    private resizeCallBack(params) {
        this.resize();
    }

    private resize() {
        console.log("resize");
        let cvs = find('Canvas').getComponent(Canvas);
        let fit = ResolutionPolicy.FIXED_HEIGHT;
        //保存原始设计分辨率，供屏幕大小变化时使用
        if (!this._curDR) {
            this._curDR = screen.resolution;
        }
        let dr = this._curDR;
        let s = screen.windowSize;
        let rw = s.width;
        let rh = s.height;
        let finalW = rw;
        let finalH = rh;
        console.log("resize frameWith = " + rw + " frameHeight = " + rh);
        if ((rw / rh) > (dr.width / dr.height)) {
            //!#zh: 是否优先将设计分辨率高度撑满视图高度。 */
            fit = ResolutionPolicy.FIXED_HEIGHT;
            //如果更长，则用定高
            finalH = dr.height;
            finalW = finalH * rw / rh;
        }
        else {
            /*!#zh: 是否优先将设计分辨率宽度撑满视图宽度。 */
            //cvs.fitWidth = true;
            fit = ResolutionPolicy.FIXED_WIDTH;
            //如果更短，则用定宽
            finalW = dr.width;
            finalH = rh / rw * finalW;
        }


        view.setDesignResolutionSize(finalW, finalH, fit);
        cvs.node.getComponent(UITransform).width = finalW;
        cvs.node.getComponent(UITransform).height = finalH;
        view.emit('resize');
        console.log("resize finalW = " + finalW + " finalH = " + finalH);
        // if (Game.NotifyManager) {
        //     Game.NotifyManager.emit(ENotifyType.WINDOW_RESIZE);
        // }
    }
    //#endregion
}

