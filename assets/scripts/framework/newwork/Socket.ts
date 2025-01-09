/*
 * @Author: JL
 * @Date: 2025-01-09 11:51:12
 */
import { sys } from "cc";
import { ISocketDelegate } from "./SocketDelegate";

export enum SocketState {
    CONNECTING = 1,
    OPEN,
    CLOSING,
    CLOSED
};

export interface ISocket {
    connect();
    send(data: string | ArrayBuffer);
    close();
    getState();
}

/**
 * WebSocket的具体实现
 */
export class WbSocket implements ISocket {
    private _url: string;
    private _delegate: ISocketDelegate;
    private _webSocket: WebSocket;

    constructor(url: string, delegate: ISocketDelegate) {
        this._url = url;
        this._delegate = delegate;
    }

    connect() {
        let ws = null;
        // if (sys.isNative && sys.os === sys.OS.ANDROID) {
        //     ws = new WebSocket(this._url, null, cacert)
        // } else {
        //其他平台直接使用
        ws = new WebSocket(this._url);
        // }

        this._webSocket = ws;
        ws.binaryType = 'arraybuffer';  // 默认为blob，这里要改为arraybuffer
        ws.onopen = (event) => {
            this._delegate.onSocketOpen();
        };
        ws.onmessage = (event) => {
            this._delegate.onSocketMessage(event.data);
        };
        ws.onerror = (event) => {
            this._delegate.onSocketError(null);
        };
        ws.onclose = (event) => {
            this._delegate.onSocketClosed(event.reason);
        }
    }

    /**
     * 
     * @param data {string | ArrayBuffer}
     */
    send(data: string | ArrayBuffer) {
        this._webSocket.send(data);
    }

    close() {
        if (!this._webSocket) {
            return;
        }
        try {
            this._webSocket.close();
        } catch (err) {
            console.error('error while closing webSocket ', err.toString());
        }
        this._webSocket = null;
    }

    getState() {
        if (this._webSocket) {
            switch (this._webSocket.readyState) {
                case WebSocket.OPEN:
                    return SocketState.OPEN;
                case WebSocket.CONNECTING:
                    return SocketState.CONNECTING;
                case WebSocket.CLOSING:
                    return SocketState.CLOSING;
                case WebSocket.CLOSED:
                    return SocketState.CLOSED;
            }
        }
        return SocketState.CLOSED;
    }
}
