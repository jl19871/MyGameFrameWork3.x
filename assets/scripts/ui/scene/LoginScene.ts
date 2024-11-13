/*
 * @Author: JL
 * @Date: 2024-11-12 20:07:48
 */
import { _decorator, Component, Node } from 'cc';
import { BaseScene } from '../../framework/base/BaseScene';
const { ccclass, property } = _decorator;

@ccclass('LoginScene')
export class LoginScene extends BaseScene {

    public async willEnter(params?: Record<string, unknown>) {
        GFM.LogMgr.log("LoginScene willEnter");
    }

    public didEnter(params?: Record<string, unknown>) {

    }

    public async willExit() {

    }

    public didExit() {

    }
}

