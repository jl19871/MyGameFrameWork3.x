/*
 * @Author: JL
 * @Date: 2024-11-12 20:07:48
 */
import { _decorator, Component, Node, sp, Sprite, SpriteFrame } from 'cc';
import { BaseScene } from '../../framework/base/BaseScene';
import { EEventEnum } from '../../framework/data/enums/EventEnums';
const { ccclass, property } = _decorator;

@ccclass('LoginScene')
export class LoginScene extends BaseScene {

    public async willEnter(params?: Record<string, unknown>) {
        GFM.LogMgr.log("LoginScene willEnter");
    }

    public didEnter(params?: Record<string, unknown>) {
        GFM.EventMgr.on(EEventEnum.SOCKET_OPEN, this.socketOpen, this);

        let node = new Node();
        node.parent = this.node;
        node.setScale(0.5, 0.5, 0.5);
        let spine = node.addComponent(sp.Skeleton);
        let skeletonData = GFM.ResMgr.get<sp.SkeletonData>("test:res/spine/cat");
        if (skeletonData) {
            spine.skeletonData = skeletonData;
            spine.setSkin("cat1")
            spine.setAnimation(0, "zoulu", true);
        }


        let sprite = new Node().addComponent(Sprite);
        sprite.spriteFrame = GFM.ResMgr.get<SpriteFrame>("test:res/sprite/icon_emo");
        sprite.node.parent = this.node;
        sprite.node.setPosition(100, 0, 0);

        let sprite2 = new Node().addComponent(Sprite);

        sprite2.spriteFrame = GFM.ResMgr.getSpriteFrame("test:res/atlas/furnish/dibiao_ketingditan");
        sprite2.node.parent = this.node;
        sprite2.node.setPosition(-100, 0, 0);

        let url = "ws://192.168.122.188:8080/wss";
        GFM.SocketMgr.connect(url);



    }

    public async willExit() {
        GFM.EventMgr.off(EEventEnum.SOCKET_OPEN, this.socketOpen, this);
    }

    public didExit() {

    }

    socketOpen() {
        let data = packet.HeartBeatB2C.create();
        GFM.SocketMgr.send(data, packet.MsgNo.MsgNo_HeartBeatB2C);
    }
}

