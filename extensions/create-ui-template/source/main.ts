import { log } from "console";


import uiTemplate from './core/UITemplate';
/**
 * @en Registration method for the main process of Extension
 * @zh 为扩展的主进程的注册方法
 */
export const methods: { [key: string]: (...any: any) => any } = {
    /**
     * @en A method that can be triggered by message
     * @zh 通过 message 触发的方法
     */
    showLog() {
    },

    async createTemplate() {
        let curSelecteds = Editor.Selection.getSelected('asset');
        if (curSelecteds.length <= 0) {
            Editor.Dialog.warn("Warning", {
                detail: 'Please select a UI prefab!',
                buttons: ['OK']
            });
            return;
        }
        await Editor.Message.request('asset-db', 'query-ready');
        let selectedUUid = curSelecteds[0];
        let assetInfo = await Editor.Message.request('asset-db', 'query-asset-info', selectedUUid);
        let assetType = assetInfo?.type;
        console.log('Asset Type:', assetType);
        if (assetType === "cc.Prefab") {
            uiTemplate.dealPrefab(assetInfo);
        }
        else {
            Editor.Dialog.warn("Warning", {
                detail: 'Please select a UI prefab!',
                buttons: ['OK']
            });
        }
    },

    settings() {
        console.log('Settings');
        Editor.Panel.open('create-ui-template');
    }
};

/**
 * @en Method Triggered on Extension Startup
 * @zh 扩展启动时触发的方法
 */
export function load() {
}

/**
 * @en Method triggered when uninstalling the extension
 * @zh 卸载扩展时触发的方法
 */
export function unload() {
}
