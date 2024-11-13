/*
 * @Author: JL
 * @Date: 2024-11-12 16:04:27
 */
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 场景基类
 */
@ccclass('BaseScene')
export abstract class BaseScene extends Component {

    public async willEnter(params?: Record<string, unknown>) {
    }

    public didEnter(params?: Record<string, unknown>) {

    }

    public async willExit() {

    }

    public didExit() {

    }
}

