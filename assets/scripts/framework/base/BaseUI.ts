/*
 * @Author: JL
 * @Date: 2024-11-12 16:07:29
 */
import { _decorator, Component, EventTouch, Input, Node, tween, UIOpacity, v3 } from 'cc';
import { IViewData } from '../manager/UIManager';
import { EEventEnum } from '../data/enums/EventEnums';
const { ccclass, property } = _decorator;

/**
 * BaseUI 基类  弹出类UI
 *
 * @export
 * @abstract
 * @class BaseUI
 */
@ccclass('BaseUI')
export abstract class BaseUI extends Component {
    protected maskNode: Node = null;    // 遮罩节点
    protected maskOptacity: number = 200;   // 遮罩透明度
    protected rootNode: Node = null;    // 根节点
    protected btn_close: Node = null;   // 关闭按钮
    protected closeUIBySide: boolean = false;   // 点击遮罩关闭UI
    protected hideUI: boolean = true;   // 是否隐藏UI
    protected isOnFocus: boolean = false;// 是否在焦点
    protected isResponseNativeKeyBack: boolean = false;// 是否响应原生返回键
    public isClosing: boolean = false;// 是否正在关闭

    onLoad(): void {
        this.hideUI = true;
        this.isClosing = false;
        // 默认开启
        this.isResponseNativeKeyBack = true;
        this.maskNode = this.node.getChildByName("mask");
        this.rootNode = this.node.getChildByName("rootNode");
        if (this.rootNode) {
            this.btn_close = this.rootNode.getChildByName("btn_back");
        }
        if (this.btn_close) {
            this.btn_close.on(Input.EventType.TOUCH_END, this.clickCloceBtn, this);


        }
        if (this.maskNode) {
            if (this.maskNode.getComponent(UIOpacity).opacity != 0) {
                this.maskNode.getComponent(UIOpacity).opacity = 125;
            }
            this.maskOptacity = this.maskNode.getComponent(UIOpacity).opacity;
            this.maskNode.on(Input.EventType.TOUCH_END, this.maskClose, this);
        }
    }

    protected onDestroy(): void {
        if (this.btn_close) {
            this.btn_close.off(Input.EventType.TOUCH_END, this.clickCloceBtn, this);
        }
        if (this.maskNode) {
            this.maskNode.off(Input.EventType.TOUCH_END, this.maskClose, this);
        }
    }

    protected onEnable(): void {
        // GFM.EventMgr.on(EEventEnum.UI_ADNROID_KEYBACK, this.AndroidClickBack, this);
    }

    protected onDisable(): void {
        // GFM.EventMgr.off(EEventEnum.UI_ADNROID_KEYBACK, this.AndroidClickBack, this);
    }

    protected maskClose() {
        if (this.closeUIBySide && this.maskNode) {
            this.closeUI();
        }
    }

    protected openHelp(event) {
        let node = null;
        if (event instanceof EventTouch) {
            node = event.target as Node;
        }
    }

    protected clickCloceBtn() {
        // GFM.AudioMgr.playEffectByUrl(GameDef.AUDIO.EFFECT.EFFECT_CLOSEUI);
        this.closeUI();
    }

    protected getShowAudioUrl(): string {
        // UI打开的声音url
        // return GameDef.AUDIO.EFFECT.EFFECT_OPENUI;
        return "";
    }

    protected getCloseAudioUrl(): string {
        // return GameDef.AUDIO.EFFECT.EFFECT_CLOSEUI;
        return "";
    }

    public static async prepareData(data: Record<string, string>) {
        return data;
    }

    public async initUI(data: Record<string, unknown>) {
        //
    }
    /**
       * 子类不要覆盖, 定制动画请重写 runOpenAni
       *
       * @protected
       * @param {boolean} [skipAnim=false]
       * @memberof BaseUI
       */
    public async openUI(skipAnim?: boolean) {
        await this.onOpenStart();
        try {
            // Game.showWaiting(`openUI:${this.getViewData().viewName}`);
            this.playOpenAudio(skipAnim);
            await this.runOpenAni(skipAnim);
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            // Game.hideWaiting(`openUI:${this.getViewData().viewName}`);
        }
        await this.onOpenEnd();
        this.isOnFocus = true;
    }

    protected onOpenStart() {
        //
    }

    protected playOpenAudio(skipAudio?: boolean) {
        if (skipAudio) {
            return;
        }
        const audioUrl = this.getShowAudioUrl();
        if (!audioUrl) {
            return;
        }
        // Game.AudioManager.playEffectByUrl(audioUrl);
    }

    protected async runOpenAni(skipAnim?: boolean): Promise<void> {
        if (skipAnim) {
            return;
        }
        if (!this.rootNode || !this.maskNode) {
            GFM.LogMgr.log("skip show anim");
            return;
        }
        await new Promise((callback) => {
            const originScale = this.rootNode.scale;
            tween(this.rootNode)
                .set({ scale: v3(0, 0, 0) })
                .to(0.25, { scale: originScale }, { easing: "backOut" })
                .call(() => { callback(null) })
                .start();
            tween(this.maskNode.getComponent(UIOpacity))
                .set({ opacity: 0 })
                .to(0.25, { opacity: this.maskOptacity })
                .start();
        });
    }

    protected onOpenEnd() {
        //
    }

    /**
     * 子类不要覆盖此函数, 定制动画重写 runCloseAni
     *
     * @protected
     * @param {boolean} [skipAnim=false]
     * @memberof BaseUI
     */
    public async closeUI(skipAnim = false) {
        if (this.isClosing) return;
        this.isOnFocus = false;
        this.isClosing = true;
        // Game.showWaiting(`closeUI:${this.getViewData().viewName}`);
        if (this.btn_close) {
            this.btn_close.off(Input.EventType.TOUCH_END, this.clickCloceBtn, this);
        }
        if (this.maskNode) {
            this.maskNode.off(Input.EventType.TOUCH_END, this.maskClose, this);
        }
        this.onCloseStart();
        this.playCloseAudio(skipAnim);
        await this.runCloseAni(skipAnim);
        this.onCloseEnd();
        // CmdParser.removeAllListener(this);
        // Game.UIManager.destroyUI(this);
        // Game.hideWaiting(`closeUI:${this.getViewData().viewName}`);
        this.isClosing = false;
    }

    protected onCloseStart() {
        //

    }

    protected playCloseAudio(skipAudio?: boolean) {
        if (skipAudio) {
            return;
        }
        const audioUrl = this.getCloseAudioUrl();
        if (!audioUrl) {
            return;
        }
        // Game.AudioManager.playEffectByUrl(audioUrl);
    }

    protected async runCloseAni(skipAnim = false) {
        if (skipAnim) {
            return;
        }
        if (!this.rootNode || !this.maskNode) {
            GFM.LogMgr.log("skip hide anim");
            return;
        }
        await new Promise((callback) => {
            tween(this.rootNode)
                .to(0.25, { scale: v3(0, 0, 0) }, { easing: "backIn" })
                .call(() => { callback(null) })
                .start();
            tween(this.maskNode.getComponent(UIOpacity))
                .to(0.25, { opacity: 0 })
                .start();
        });
    }

    protected onCloseEnd() {
        //
    }

    /**
     * 只有 Topview 关闭时, 自己变成 Topview 时触发
     *
     * @protected
     * @memberof BaseUI
     */
    public onFocus() {
        //
        // this.node.active = true;
        this.isOnFocus = true;
    }

    /**
     * 当前 view 被新的 Topview 盖住时触发, 覆盖多个时只有第一次触发
     *
     * @protected
     * @memberof BaseUI
     */
    public onLostFocus() {
        //
        // this.node.active = false;
        this.isOnFocus = false;
    }

    /**
     * 获取当前界面的相关信息
     *
     * @returns {IViewData}
     * @memberof BaseUI
     */
    public getViewData(): IViewData {
        return null;
    }

    /**
     * 是否为全屏界面
     *
     * @public
     * @returns
     * @memberof BaseUI
     */
    public isFullScreen() {
        return false;
    }

    /**
   * 是否在优化显示时隐藏 默认隐藏
   *
   * @public
   * @returns
   * @memberof BaseUI
   */
    public isHideUI() {
        return this.hideUI;
    }

    protected AndroidClickBack() {
        if (this.isResponseNativeKeyBack) {
            if (this.isOnFocus) {
                this.closeUI();
            }
        }
    }
}


