/*
 * @Author: JL
 * @Date: 2024-11-12 16:15:51
 */
import { _decorator, Component, instantiate, Node, Prefab, resources, Vec3 } from 'cc';
import { BaseUI } from '../base/BaseUI';
import { EEventEnum } from '../data/enums/EventEnums';
const { ccclass, property } = _decorator;

/**
 * UI界面名称
 *
 * @export
 * @enum {number}
 */
export enum EViewName {
    UI_ConfirmBoard = "UI_ConfirmBoard",
    UI_Tips = "UI_Tips",
    UI_Qipao = "UI_Qipao"
}

/**
* popview 数据结构
*
* @export
* @interface IViewData
*/
export interface IViewData {
    // view 名字
    viewName: EViewName;
    // 除通用资源目录外，引用的资源目录，没有可不填
    resDirs: string[];
    // 创建界面所需的 prefab
    prefabUrl: string;
}

interface IGameViewCfg {
    viewData: IViewData;
    viewClass: BaseUI;
}

interface ICreateQueue {
    viewCfg: IGameViewCfg;
    userData: Record<string, unknown>;
}

// ============================ UI ===============================
/**
 * UI 管理器, 注册 UI, 显示 UI
 *
 * @export
 * @class UIManager
 */
export default class UIManager {
    get fullScreenViewRefNum() {
        return this._fullScreenViewRefNum;
    }
    set fullScreenViewRefNum(value: number) {
        this._fullScreenViewRefNum = value;
        this.updateCreatedUIs();
    }
    private _fullScreenViewRefNum = 0;

    private uiRootNode: Node = null;

    private viewDataMap: Map<EViewName, IGameViewCfg> = new Map();

    private createdUIs: BaseUI[] = [];

    private createQueue: ICreateQueue[] = [];

    private isCreatingUI = false;

    public async setup() {
        // GFM.LogMgr.log("UIManager setup");
    }

    release() {

    }

    public setUIRootNode(node: Node) {
        this.uiRootNode = node;
    }

    public getUIRootNode(): Node {
        return this.uiRootNode;
    }

    /**
     * 
     * @param viewData 界面参数
     * @param viewClass 界面
     */
    public registUI(viewData: IViewData, viewClass: any) {
        this.viewDataMap.set(viewData.viewName, { viewData, viewClass });
    }

    /**
     * 
     * @param viewName UI名称
     * @param userData 需要传输的数据 在initUI中调用
     * @returns 
     */

    public async openUI(viewName: EViewName, userData?: Record<string, unknown>) {
        const viewCfg = this.viewDataMap.get(viewName);
        if (!viewCfg) {
            console.warn(`view: ${viewName} not regist`);
            return;
        }
        if (!this.uiRootNode) {
            console.error("uiRootNode is null");
        }
        this.createQueue.push({ viewCfg, userData });
        if (!this.isCreatingUI) {
            await this.creatUI();
        }
    }

    /**
     * 异步创建队列中所有UI
     * @returns 
     */
    private async creatUI() {
        const createData = this.createQueue.shift();
        if (!createData) {
            return;
        }
        this.isCreatingUI = true;
        const viewData = createData.viewCfg.viewData;

        GFM.showWaiting(`creatUI: ${viewData.viewName}`);

        try {
            await GFM.ResMgr.loadDirs(viewData.resDirs);
        }
        catch (e) {
            console.error(e);
        }
        const prefab = resources.get<Prefab>(viewData.prefabUrl, Prefab);
        if (prefab == undefined) {
            console.error("UIManager createUI Error  not found prefab = " + viewData.prefabUrl);
            return;
        }
        const node = instantiate(prefab);
        // node.name = cc.path.basename(viewData.prefabUrl);
        node.name = viewData.viewName;
        node.position = Vec3.ZERO;
        node.parent = this.uiRootNode;
        this.isCreatingUI = false;

        GFM.hideWaiting(`creatUI: ${viewData.viewName}`);
        const ui = node.getComponent(BaseUI);
        ui.name = viewData.viewName;
        const curTopView = this.createdUIs[this.createdUIs.length - 1];
        if (curTopView) {
            curTopView.onLostFocus();
            // GFM.LogMgr.log(`view: ${curTopView.getViewData().viewName} onLostFocus`);
        }

        this.createdUIs.push(ui);
        await ui.initUI(createData.userData);
        await ui.openUI();
        if (ui.isFullScreen()) {
            this.fullScreenViewRefNum += 1;
        }
        // 递归创建队列中的 view
        await this.creatUI();
    }

    public destroyUI(ui: BaseUI) {
        const viewData = ui.getViewData();
        const viewIndex = this.createdUIs.findIndex((o) => o === ui);
        if (viewIndex === -1) {
            return;
        }
        const isTopView = viewIndex === this.createdUIs.length - 1;
        this.createdUIs.splice(viewIndex, 1);
        if (ui.isFullScreen()) {
            this.fullScreenViewRefNum -= 1;
        }
        ui.node.parent = null;
        if (isTopView && this.createdUIs.length > 0) {
            const curTopView = this.createdUIs[this.createdUIs.length - 1];
            curTopView.onFocus();
            // GFM.LogMgr.log(`view: ${curTopView.getViewData().viewName} onFocus`);
        }
        GFM.ResMgr.releaseDirs(viewData.resDirs);
        if (this.createdUIs.length == 0) {
            GFM.EventMgr.emit(EEventEnum.UI_DESTORY_LASTONE);
        }
    }

    public getUIByName(name: EViewName) {
        let ui = this.createdUIs.find((o) => o.name === name);
        return ui;
    }

    public hideAllUI() {
        this.createdUIs.forEach((ui, index) => {
            ui.node.active = index === this.createdUIs.length - 1;
        });
    }

    public showAllUI() {
        this.createdUIs.forEach(ui => {
            ui.node.active = true
        });
    }

    public async closeAllUI() {
        let index = this.createdUIs.findIndex(o => o.isClosing == false);
        while (index != -1) {
            let ui = this.createdUIs[index];
            await ui.closeUI(true);
            index = this.createdUIs.findIndex(o => o.isClosing == false);
        }
    }

    public isHaveUI(): boolean {
        return this.createdUIs.length > 0;
    }
    // ============================ 刷新UI显示 ===============================
    private updateCreatedUIs() {

        let len = this.createdUIs.length;
        let index = -1;
        for (let i = len - 1; i >= 0; i--) {
            let ui = this.createdUIs[i];

            if (index == -1) {
                if (ui.isFullScreen()) {
                    index = i;
                }
                if (ui.isHideUI()) {
                    ui.node.active = true;
                }
            }
            else {
                if (ui.isHideUI() && !ui.isClosing) {
                    ui.node.active = (i > index);
                }
            }
        }
    }
    // ============================ 通用方法 ===============================
    public showTips(tip: string) {
        if (tip == "" || tip == undefined) return;
        this.openUI(EViewName.UI_Tips, { "tip": tip });
    }

    // public showDialog(params: DialogParams) {
    //   this.openUI(EViewName.UI_ConfirmBoard, params as any);
    // }

    // public async showReward(params: GameDef.Currency[]) {
    //   await this.openUI(EViewName.UI_Huode, params as any);
    // }

    // public showRewardTip(params: any) {
    //   // this.openUI(EViewName.UI_RewardTip, params);
    // }

    // public showQipao(tid: string, node?: cc.Node) {
    //   let param: QIPAO_PARAMS = {
    //     tid: tid,
    //     node: node
    //   }
    //   this.openUI(EViewName.UI_Qipao, param as any);
    // }
}

