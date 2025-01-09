import { sys } from "cc";
import { ISocket, SocketState, WbSocket } from "./Socket";
import { EEventEnum } from "../data/enums/EventEnums";

const DATA_TOTAL_LEN = 4;	//数据总长度
const PROTOCOLTYPE_LEN = 4;	//协议号长度

export interface ISocketDelegate {
    onSocketOpen();
    onSocketMessage(data: string | ArrayBuffer);
    onSocketError(errMsg);
    onSocketClosed(msg: string);
}

/**
 * 实现socket各个回调接口
 */
export class SocketDelegate implements ISocketDelegate {
    private _socket: ISocket;

    private connectUrl = null;
    private needReconnect = true;

    clearReconnectData() {
        this.needReconnect = true;
        // Game.DataManager.cache.reconnectTimes = 0;
        // Game.DataManager.cache.reconnectUrls = null;
    }

    isSocketOpened() {
        return (this._socket && this._socket.getState() == SocketState.OPEN);
    }

    isSocketClosed() {
        return this._socket == null;
    }

    connect(url: string) {
        // Log.log(LOG_TAG.SOCKET, 'connect socket = ' + url);
        GFM.LogMgr.log('connect socket = ' + url);
        // 根据平台创建socket
        this._socket = new WbSocket(url, this);
        this._socket.connect();
    }

    closeConnect(needReconnect: boolean = true) {
        this.needReconnect = needReconnect;
        if (this._socket) {
            this._socket.close();
        }
    }

    onSocketOpen() {
        GFM.LogMgr.log('socket open');
        GFM.EventMgr.emit(EEventEnum.SOCKET_OPEN);
    }

    onSocketError(errMsg) {
        errMsg && GFM.LogMgr.error('socket error, msg = ' + errMsg);
        GFM.EventMgr.emit(EEventEnum.SOCKET_ERROR);
    }

    onSocketClosed(msg: string) {
        GFM.LogMgr.log('socket close, reason = ' + msg);
        if (this._socket) {
            this._socket.close();
        }
        this._socket = null;
        GFM.EventMgr.emit(EEventEnum.SOCKET_CLOSE, msg);
    }

    onSocketMessage(data: string | ArrayBuffer) {
        if (this.isSocketClosed()) {
            // Log.error('onMessage call but socket had closed')
            return;
        }
        let msg;
        if (typeof (data) === 'string') {
            msg = data;
        } else {
            msg = this.bufferToMsg(data);
        }
        GFM.LogMgr.log('recieve msg = ', msg);
        // EventMgr.emit(msg.messageName, msg);
        // CmdParser.parseMsg(msg.proto, msg.data);
        // UIHelp.CloseWaiting();
    }

    send(msg, cmd) {
        GFM.LogMgr.log('send msg = ', msg);
        // if (typeof (msg) === 'string') {
        //     this._socket.send(msg);
        // } else {
        //     let sendBuf = this.msgToBuffer(msg, cmd);
        //     // UIHelp.ShowWaiting();
        //     this._socket.send(sendBuf);
        // }
        let sendBuf = this.msgToBuffer(msg, cmd);
        this._socket.send(sendBuf);
    }

    /**
     * buffer转msg，解包用
     * 协议格式：总字节数（4个字节，总字节数=协议号字节数+数据长度） + 协议号（4个字节） + 数据
     * @param recvBuf 
     */
    private bufferToMsg(recvBuf: ArrayBuffer) {
        let cc = new Uint8Array(recvBuf);
        let message = packet.Packet.decode(cc);
        return message;
        // let message = yxy.apple.protobuf.Parcal.decode(cc);
        // return message;
    }

    /**
     * msg转buffer，封包用
     * 协议格式：总字节数（4个字节，总字节数=协议号字节数+数据长度） + 协议号（4个字节） + 数据
     * @param msg 
     */
    private msgToBuffer(msg, cmd: number) {
        let bytes = msg.constructor.encode(msg).finish();

        let packetInstance = packet.Packet.create();
        packetInstance.data = bytes;
        packetInstance.msg_no = cmd;
        packetInstance.unix_milli = Date.now();

        let _bytes = packet.Packet.encode(packetInstance).finish();
        var arrayBuffer = _bytes.slice().buffer;

        return arrayBuffer
    }
}