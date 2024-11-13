
import { resources } from "cc";
import IDataModel from "../IDataModel";
import { JsonAsset } from "cc";
import { EEventEnum } from "../../enums/EventEnums";

/**
 * 支持的语言类型
 *
 * @export
 * @enum {number}
 */
export enum ELangType {
    EN = "en",   // 英文
    ZH = "zh"    // 中文
}

export default class LangModel extends IDataModel {
    clear(): void {
    }
    // 游戏内资源
    // json 资源
    private langJson: Record<string, string> = {};

    // 错误返回json
    private langResultJson = [];

    private _curLang: ELangType = ELangType.EN;

    constructor() {
        super('LangModel');
    }

    get curLang(): ELangType {
        return this._curLang;
    }

    public async setup() {
        // const defaultLang = ELangType[cc.sys.language.toUpperCase()] || ELangType.EN;
        const defaultLang = ELangType.EN;
        this.LoadStorage();
        this._curLang = this.Get('curLang', defaultLang) as ELangType;
        // 读取语言文件
        await this.loadLanguageDir(this._curLang);
        GFM.LogMgr.log("LangModel setup");
    }

    /**
     * 动态加载语言包
     *
     * @private
     * @param lang
     * @memberof LangModel
     */
    private async loadLanguageDir(lang: string = this._curLang) {
        await GFM.ResMgr.loadDir(`Lang/${lang}`, percent => {
            let number = Number(percent * 100).toFixed(0);
            GFM.EventMgr.emit(EEventEnum.LOADING_PROGRESS, { tid: `TID_LOADING_1,${number}`, pro: percent });
        });

        GFM.LogMgr.log("读取本地语言表");
        const langPath = `Lang/${lang}/StringList`;
        const langData = resources.get<JsonAsset>(langPath, JsonAsset);
        if (langData) {
            this.langJson = langData.json;
        }
    }

    /**
     * 释放语言包
     *
     * @private
     * @param lang
     * @memberof LangModel
     */
    private async releaseLanguageDir(lang: string) {
        GFM.ResMgr.releaseDir(`language/${lang}`);
    }


    /**
     * 语言改变处理
     *
     * @param lang
     * @memberof LangModel
     */
    public async setLanguage(lang: ELangType) {
        if (this._curLang === lang) {
            return;
        }

        const orginLang = this._curLang;
        this._curLang = lang;

        GFM.showWaiting("changeLanguage");
        this.Set('curLang', this._curLang);
        this.Save();
        await this.loadLanguageDir(lang);
        GFM.EventMgr.emit(EEventEnum.LANG_CHANGE);
        this.releaseLanguageDir(orginLang);
        GFM.hideWaiting("changeLanguage");
    }

    /**
       * 获得 tid 对应的字符串配置
       *
       * @param tid
       * @returns string
       * @memberof LangModel
       */
    public getLangStr(tid: string): string {
        const [id, ...args] = tid.split(",");
        let str = this.langJson[id];
        if (str === undefined) {
            return tid;
        }
        args.forEach((arg, index) => {
            // str = str.replace("${p" + (index + 1) + "}", arg);
            let g = "\\${p" + (index + 1) + "}";
            let reg = new RegExp(g, "g");
            str = str.replace(reg, arg);
        });
        return str;
    }


    public getLangResultStr(tid: string): string {
        const [id, ...args] = tid.split(",");
        let result = this.langResultJson.find((o) => o.value === Number(tid));
        if (result) {
            let str = result.comment;
            args.forEach((arg, index) => {
                // str = str.replace("${p" + (index + 1) + "}", arg);
                let g = "\\${p" + (index + 1) + "}";
                let reg = new RegExp(g, "g");
                str = str.replace(reg, arg);
            });
            return str;
        }
        else {
            return tid;
        }
    }

}
