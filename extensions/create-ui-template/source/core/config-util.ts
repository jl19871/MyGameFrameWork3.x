/*
 * @Author: JL
 * @Date: 2024-12-16 14:16:45
 */
const fs = require('fs');
const path = require('path');

class ConfigUtil {
    package_name = 'create-ui-template';
    configData: any = null;
    myData: any = null;

    constructor() {
        this.init();
    }

    init() {
        this.configData = {};
        this.myData = {
            uiOutputPath: "assets/scripts/ui/view",
        };
    }

    initConfig(cb: Function) {
        let configPath = this._getPath();
        if (fs.existsSync(configPath)) {
            fs.readFile(configPath, 'utf8', (err: string, data: any) => {
                if (err) {
                    console.error(err);
                    return;
                }
                this.configData = JSON.parse(data.toString());
                if (!this.configData[this.package_name]) {
                    this.configData[this.package_name] = this.myData;
                    this._save();
                }
                else {
                    this.myData = this.configData[this.package_name];
                }
                cb && cb(this.myData);
            });
        }
        else {
            cb && cb(this.myData);
        }
    }

    initConfigSync(): Promise<any> {
        let configPath = this._getPath();
        if (fs.existsSync(configPath)) {
            return new Promise((resolve, reject) => {
                fs.readFile(configPath, 'utf8', (err: string, data: any) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    }
                    this.configData = JSON.parse(data.toString());
                    if (!this.configData[this.package_name]) {
                        this.configData[this.package_name] = this.myData;
                        this._save();
                    }
                    else {
                        this.myData = this.configData[this.package_name];
                    }
                    resolve(this.myData);
                });
            });

        }
        else {
            return this.myData;
        }
    }

    _getPath() {
        let cfgFileName = 'package-configuration.json';
        let cfgPath = path.join(Editor.Project.path, 'settings', cfgFileName);
        return cfgPath;
    }

    _save() {
        let cfgPath = this._getPath();
        fs.writeFileSync(cfgPath, JSON.stringify(this.configData));
    }


    saveCfg(data: any) {
        this.myData.uiOutputPath = data.uiOutputPath;
        this.configData[this.package_name] = this.myData;
        this._save();
    }
}

export default new ConfigUtil();