import { _decorator, Button, Component, Enum, EventTouch, Input } from "cc";

/*
 * @Author: JL
 * @Date: 2024-06-17 14:09:35
 */
const { ccclass, property, requireComponent, menu } = _decorator;

interface GroupData {
    /** 该组是否锁定，同组按钮被触摸时进入锁定状态 */
    lock: boolean;
    /** 同组按钮 */
    buttonSet: Set<Button>;
}

/**
 * 按钮分组
 */
enum ButtonGroup {
    DEFAULT,
    UI
}
/**
 * 防多点触摸的按钮，同组按钮同一时刻只会有一个生效
 */
@ccclass
@requireComponent(Button)
@menu("UI组件/Button/ButtonSingle")
export default class ButtonSingle extends Component {
    @property({ type: Enum(ButtonGroup) })
    public buttonGroup: ButtonGroup = ButtonGroup.UI;

    /** 记录所有绑定该组件的按钮数据 */
    private static _groupMap: Map<ButtonGroup, GroupData> = null;
    private static get groupMap(): Map<ButtonGroup, GroupData> {
        if (this._groupMap === null) {
            this._groupMap = new Map();
        }
        return this._groupMap;
    }

    private _button: Button = null;

    protected onLoad(): void {
        this._button = this.getComponent(Button);
        let groupData: GroupData = ButtonSingle.groupMap.get(this.buttonGroup);
        if (groupData === undefined) {
            groupData = {
                lock: false,
                buttonSet: new Set()
            };
            ButtonSingle.groupMap.set(this.buttonGroup, groupData);
        }
        groupData.buttonSet.add(this._button);

        this.node.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }

    protected onDestroy(): void {
        let groupData: GroupData = ButtonSingle.groupMap.get(this.buttonGroup);
        if (groupData === undefined) {
            GFM.LogMgr.error(`[ButtonSingle.onDestroy] 数据异常 ButtonGroup: ${this.buttonGroup}`);
            return;
        }
        groupData.buttonSet.delete(this._button);
        this.unlock(groupData);
    }

    private onTouchStart(event: EventTouch): void {
        let groupData: GroupData = ButtonSingle.groupMap.get(this.buttonGroup);
        if (groupData === undefined) {
            GFM.LogMgr.error(`[ButtonSingle.onTouchStart] 数据异常 ButtonGroup: ${this.buttonGroup}`);
            return;
        }

        if (groupData.lock) {
            return;
        }
        groupData.lock = true;
        groupData.buttonSet.forEach((e) => {
            e.enabled = (e === this._button);
        });
    }

    private onTouchEnd(event: EventTouch): void {
        let groupData: GroupData = ButtonSingle.groupMap.get(this.buttonGroup);
        if (groupData === undefined) {
            GFM.LogMgr.error(`[ButtonSingle.onTouchEnd] 数据异常 ButtonGroup: ${this.buttonGroup}`);
            return;
        }

        this.unlock(groupData);
    }

    /**
     * 当前按钮松开或销毁时解除同组按钮锁定状态
     */
    private unlock(groupData: GroupData): void {
        if (groupData.lock && this._button.enabled) {
            groupData.lock = false;
            groupData.buttonSet.forEach((e) => {
                e.enabled = true;
            });
        }
    }
}

