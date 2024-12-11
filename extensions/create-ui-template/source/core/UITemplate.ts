/*
 * @Author: JL
 * @Date: 2024-12-11 17:44:40
 */

const fs = require('fs');
const path = require('path');
// const configUtil = require('./config-util');


class UITemplate {
    outputRelativePath: string = '';
    outputFullPath: string = '';
    scriptTemplate: string = '';
    templatePath: string = '';

    constructor() {
        this.init();
    }

    async init() {
        this.outputRelativePath = "assets/scripts/ui/view";
        this.outputFullPath = path.join(Editor.Project.path, this.outputRelativePath);
        this.templatePath = Editor.Utils.Path.join(Editor.Project.path, 'extensions/create-ui-template/source/core/ui-template.txt');
    }

    // 首字母大写
    firstCharUpper(str: string) {
        str = str.substring(0, 1).toUpperCase() + str.substring(1);
        return str;
    }

    /**
     * 输入：db://assets/resources/Prefab/Fight/FightUI.prefab
     * 输出：Prefab/Fight/FightUI
     */
    getPrefabPath(url: string) {
        let prefabStr = 'Prefab/';
        let prefabSuffix = '.prefab';
        let start = url.indexOf(prefabStr);
        let end = url.indexOf(prefabSuffix);
        return url.substring(start, end);
    }

    async dealPrefab(assetInfo: any) {
        let url = assetInfo.url;
        if (!fs.existsSync(this.outputFullPath)) {
            fs.mkdirSync(this.outputFullPath);
        }

        let count = 0;
        let cengshu = '';
        let module = '';
        let a = path.dirname(url);
        let moduleName = '';
        while (module !== "UI") {
            count++;
            if (count > 10) break;
            module = path.basename(a, path.extname(a));
            a = path.dirname(a);
            if (module !== "UI") {
                cengshu += "../";
                moduleName = moduleName === '' ? `${module}${moduleName}` : `${module}/${moduleName}`;
            }
        }
        if (count >= 20) {
            Editor.Dialog.warn("Warning", {
                detail: 'Please select a UI prefab in UI folder!',
                buttons: ['OK']
            });
            return;
        }
        //创建对应父文件夹
        let moduleFolder = path.join(this.outputFullPath, moduleName);
        if (!fs.existsSync(moduleFolder)) {
            fs.mkdirsSync(moduleFolder);
        }
        //生成对应的ts文件
        let uiName = 'UI_' + this.firstCharUpper(path.basename(url, path.extname(url)));
        let exportUIPath = `db://${this.outputRelativePath}/${moduleName}/${uiName}.ts`;
        console.log("path = " + exportUIPath + " cengshu = " + cengshu);
        let prefabPath = '';
        if (assetInfo.type === 'cc.Prefab') {
            prefabPath = this.getPrefabPath(url);
        }
        let scriptTemplate = fs.readFileSync(this.templatePath, 'utf8') + "";

        scriptTemplate = scriptTemplate.replace(/_TREE/g, cengshu);
        scriptTemplate = scriptTemplate.replace(/_MODULE/g, moduleName);
        scriptTemplate = scriptTemplate.replace(/_PREFABPATH/g, prefabPath);
        scriptTemplate = scriptTemplate.replace(/_UINAME/g, uiName);

        let scriptInfo = await Editor.Message.request('asset-db', 'create-asset', exportUIPath, scriptTemplate);
    }
}

export default new UITemplate();