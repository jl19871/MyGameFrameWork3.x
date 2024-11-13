import { Component, Label, Tween, _decorator, tween } from "cc";
import { DEV } from "cc/env";

const { ccclass, property, requireComponent } = _decorator;

@ccclass
@requireComponent(Label)
export default class NumCounter extends Component {

    @property({ tooltip: DEV && '动作时间' })
    public time: number = 1;

    @property({ tooltip: DEV && '保持数值为整数' })
    public keepInteger: boolean = true;

    private label: Label = null;

    private _value: number = 0;
    /**
     * 数值
     */
    public get value() { return this._value; }
    public set value(value) {
        if (this.keepInteger) value = Math.floor(value);
        this._value = value;
        this.label.string = value.toString();
    }

    private tween: Tween<NumCounter> = null;

    private lastTarget: number = 0;

    protected onLoad() {
        this.init();
    }

    /**
     * 初始化组件
     */
    private init() {
        this.label = this.getComponent(Label);
        this.value = 0;
    }

    /**
     * 设置数值
     * @param value 数值
     */
    public setValue(value: number) {
        this.value = value;
    }

    /**
     * 设置时间
     * @param time 时间
     */
    public setTime(time: number) {
        this.time = time;
    }

    /**
     * 滚动数值
     * @param target 目标值
     * @param time 时间
     * @param callback 完成回调
     */
    public to(target: number, time: number = null, callback?: () => void): Promise<void> {
        return new Promise<void>(res => {
            if (this.tween) {
                this.tween.stop();
                this.tween = null;
            }
            if (time !== null) {
                this.time = time;
            }
            this.lastTarget = target;
            this.tween = tween<NumCounter>(this)
                .to(this.time, { value: target })
                .call(() => {
                    callback && callback();
                    this.tween = null;
                    res();
                })
                .start();
        });
    }

    /**
     * 相对滚动数值
     * @param diff 差值
     * @param time 时间
     * @param callback 完成回调
     */
    public by(diff: number, time: number = null, callback?: () => void): Promise<void> {
        return new Promise<void>(res => {
            if (this.tween) {
                this.tween.stop();
                this.tween = null;
                this.value = this.lastTarget;
            }
            if (time !== null) {
                this.time = time;
            }
            this.lastTarget = this.value + diff;
            this.tween = tween<NumCounter>(this)
                .to(this.time, { value: this.lastTarget })
                .call(() => {
                    callback && callback();
                    this.tween = null;
                    res();
                })
                .start();
        });
    }

}