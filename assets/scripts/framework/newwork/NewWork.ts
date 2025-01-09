/*
 * @Author: JL
 * @Date: 2021-10-08 15:47:04
 */
import { SocketDelegate } from "./SocketDelegate";

export default class Network {
    private _socket: SocketDelegate = null;
    private _url: string = 'ws://localhost:3000';

    private _preServerTimeStamp: number;
    private _serverTimeStamp: number;

    constructor() {
        // this.safeConnectSocket();
        this._serverTimeStamp = 0;
        this._preServerTimeStamp = 0;
    }

    close(needReconnect: boolean = true) {
        this.safeCloseSocket(needReconnect);
    }

    send(data: any, _cmd: number | boolean, _wait?: boolean) {
        if (!this._socket.isSocketOpened()) {
            // Log.error('send message but socket not open!')
            return;
        }

        // if (wait) {
        // GFM.showWaiting(`cmd : ${cmd.toString(16)}`);
        // }

        this._socket.send(data, _cmd);
    }

    connect(url?: string) {
        this.safeConnectSocket(url);
    }

    private safeConnectSocket(url: string) {
        if (this._socket != null) {
            this._socket.closeConnect(false);
        }
        this._socket = new SocketDelegate();

        if (url != undefined) {
            this._url = url;
        }
        this._socket.connect(this._url);
    }

    private safeCloseSocket(needReconnect: boolean) {
        if (this._socket != null) {
            this._socket.closeConnect(needReconnect);
        }
        this._socket = null;
    }

    isSocketOpened() {
        return (this._socket && this._socket.isSocketOpened());
    }

    getServerTime(): number {
        if (!this.isSocketOpened()) return 0;
        return this._serverTimeStamp + Date.now();
    }

    setServerTime(time: number) {
        if (!this.isSocketOpened()) {
            this._serverTimeStamp = 0;
            this._preServerTimeStamp = 0;
        }
        else {
            this._serverTimeStamp = time - Date.now();
            this._preServerTimeStamp = time;
        }
    }
}