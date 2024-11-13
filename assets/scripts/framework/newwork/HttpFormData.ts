/*
 * @Author: JL
 * @Date: 2023-08-31 11:28:10
 */
export class HttpFormData {
    private _boundary_key: string = 'myformdata';
    private _boundary: string;
    private _end_boundary: string;
    private _result: string;

    constructor() {
        this._boundary = '--' + this._boundary_key;
        this._end_boundary = this._boundary + '--';
        this._result = "";
    }

    public append(key: string, value: string, filename?: string) {
        this._result += this._boundary + '\r\n';
        if (filename) {
            this._result += 'Content-Disposition: form-data; name="' + key + '"' + '; filename="' + filename + '"' + '\r\n\r\n';
        } else {
            this._result += 'Content-Disposition: form-data; name="' + key + '"' + '\r\n\r\n';
        }

        this._result += value + '\r\n';
    }

    public get arrayBuffer(): ArrayBuffer {
        this._result += '\r\n' + this._end_boundary;
        let charArr: Array<any> = [];

        for (var i = 0; i < this._result.length; i++) { // 取出文本的charCode（10进制）
            charArr.push(this._result.charCodeAt(i));
        }

        let array: Uint8Array = new Uint8Array(charArr);
        return array.buffer;
    }
}