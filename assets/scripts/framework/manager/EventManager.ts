import { EEventEnum } from "../data/enums/EventEnums";

type NotifyFunc = (userData: unknown, EEventEnum?: EEventEnum) => void;

interface IObserver {
    func: NotifyFunc;
    target: unknown;
}

/**
 * 全局事件通知
 *
 * @export
 * @class EventManager
 */
export default class EventManager {

    private observerMap: Map<EEventEnum, IObserver[]> = new Map();

    constructor() {
        // 检查 EEventEnum 拼写, 并初始化 observerMap
        for (const key in EEventEnum) {
            if (Object.prototype.hasOwnProperty.call(EEventEnum, key)) {
                const notifyName = EEventEnum[key];
                if (notifyName !== key) {
                    throw new Error(`Definition Error ${key} -> ${notifyName}`);
                }
                this.observerMap.set(notifyName, []);
            }
        }
    }

    public async setup() {
        GFM.LogMgr.log("EventMgr setup");
    }

    /**
     * 注册事件
     *
     * @param EEventEnum
     * @param notifyFunc
     * @param target
     * @memberof NotifyManager
     */
    public on(notifyType: EEventEnum, notifyFunc: NotifyFunc, target: unknown) {
        this.observerMap.get(notifyType).push({ func: notifyFunc, target: target });
    }

    /**
     * 移除事件
     *
     * @param notifyType
     * @param notifyFunc
     * @param target
     * @memberof NotifyManager
     */
    public off(notifyType: EEventEnum, notifyFunc: NotifyFunc, target: unknown) {
        const observers = this.observerMap.get(notifyType);
        const index = observers.findIndex((o) => o.func === notifyFunc && o.target === target);
        index >= 0 && observers.splice(index, 1);
    }

    /**
     * 移除指定对象上的所有事件
     * @param target 要移除所有事件的对象
     */
    public targetOff(target: unknown) {
        if (target) {
            for (const key in this.observerMap) {
                if (Object.prototype.hasOwnProperty.call(this.observerMap, key)) {
                    const observers = this.observerMap[key];
                    for (let i = 0; i < observers.length; i++) {
                        const o = observers[i];
                        if (o.target == target) {
                            observers.splice(i, 1);
                            i--;
                        }
                    }
                }
            }
        }
    }

    /**
     * 发射事件
     *
     * @template T
     * @param EEventEnum
     * @param [userData=null]
     * @memberof NotifyManager
     */
    public emit<T extends unknown>(EEventEnum: EEventEnum, userData: T = null) {
        this.observerMap.get(EEventEnum).forEach((obs: IObserver) => {
            if (obs.target) {
                obs.func.call(obs.target, userData, EEventEnum);
            } else {
                obs.func(userData, EEventEnum);
            }
        });
    }

    clearAll() {
        for (const key in EEventEnum) {
            if (Object.prototype.hasOwnProperty.call(EEventEnum, key)) {
                const notifyName = EEventEnum[key];
                if (notifyName !== key) {
                    throw new Error(`Definition Error ${key} -> ${notifyName}`);
                }
                this.observerMap.set(notifyName, []);
            }
        }
    }

    clear(array: string[]) {
        for (const key in EEventEnum) {
            if (Object.prototype.hasOwnProperty.call(EEventEnum, key)) {
                const notifyName = EEventEnum[key];
                if (notifyName !== key) {
                    throw new Error(`Definition Error ${key} -> ${notifyName}`);
                }
                if (array.indexOf(notifyName) == -1)
                    this.observerMap.set(notifyName, []);
            }
        }
    }
}
