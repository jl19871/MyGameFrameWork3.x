/*
 * @Author: JL
 * @Date: 2024-11-12 16:53:06
 */

import GameModel from "../data/datamodel/game/GameModel";
import ResModel from "../data/datamodel/game/ResModel";
import IDataModel from "../data/datamodel/IDataModel";
import LangModel from "../data/datamodel/lang/LangModel";

/**
 * 数据管理类，需要配合IDataModel使用
 */
export default class DataManager {
    private _tModel: Array<IDataModel> = [];

    private _lang: LangModel = null;
    get lang(): LangModel {
        return this._lang;
    }

    private _game: GameModel;
    public get game(): GameModel {
        return this._game;
    }

    private _res: ResModel;
    public get res(): ResModel {
        return this._res;
    }

    constructor() {

    }

    newModel<T extends IDataModel>(c: { new(): T }): T {
        let obj = new c();
        this._tModel.push(obj);
        return obj
    }

    clear() {
        this._tModel.forEach(m => {
            m.clear();
        });
    }

    public async setup() {
        this._res = this.newModel(ResModel);
        await this._res.setup();

        this._lang = this.newModel(LangModel);
        await this._lang.setup();

        this._game = this.newModel(GameModel);
        await this._game.setup();

        // GFM.LogMgr.log("DataManager setup");
    }

}