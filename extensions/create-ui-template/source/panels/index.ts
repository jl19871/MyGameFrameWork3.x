import configUtil from "../core/config-util";
let Electron = require('electron');
let fs = require('fs');
let path = require('path');
/*
 * @Author: JL
 * @Date: 2024-12-16 14:32:12
 */


module.exports = Editor.Panel.define({
    listeners: {
        show() { console.log('show'); },
        hide() { console.log('hide'); },
    },
    template: fs.readFileSync(path.join(__dirname, '../../../create-ui-template/source/panels/index.html'), 'utf-8'),
    style: fs.readFileSync(path.join(__dirname, '../../../create-ui-template/source/panels/index.css'), 'utf-8'),
    $: {
        app: '#app',
        inputField: '#inputField',
        selectBtn: '#selectBtn',
        openBtn: '#openBtn',
    },
    methods: {
        setInputValue(value: string) {
            (this.$.inputField as HTMLInputElement).value = value;
        },

        getInputValue(): string {
            const value = (this.$.inputField as HTMLInputElement).value;
            console.log('Current input value:', value);
            return value;
        },

        _initConfig() {
            configUtil.initConfig((data: any) => {
                console.log("data:", data.uiOutputPath);
                this.setInputValue(data.uiOutputPath);
            });
        },

        _saveConfig() {
            let data = {
                uiOutputPath: this.getInputValue(),
            }
            configUtil.saveCfg(data);
        },

        async onBtnSelectUIPath() {
            try {
                const result = await Editor.Message.request('create-ui-template', 'chooseDirectory', this.getInputValue());
                if (result) {
                    this.setInputValue(result);
                    this._saveConfig();
                }
                else {
                    console.error('选择目录失败:', result);
                }
            } catch (error) {
                console.error('打开目录选择对话框失败:', error);
            }
        },

        onBtnOpenUIPath() {
            let fullPath = path.join(Editor.Project.path, this.getInputValue());
            if (fs.existsSync(fullPath)) {
                Electron.shell.showItemInFolder(fullPath);
                Electron.shell.beep();
            }
        }
    },

    ready() {
        if (this.$.selectBtn) {
            this.$.selectBtn.onclick = this.onBtnSelectUIPath.bind(this);
        }
        if (this.$.openBtn) {
            this.$.openBtn.onclick = this.onBtnOpenUIPath.bind(this);
        }
        this._initConfig();
    },

});