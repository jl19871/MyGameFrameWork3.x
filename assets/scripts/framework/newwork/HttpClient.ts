import { HttpFormData } from "./HttpFormData";

/*
 * @Author: JL
 * @Date: 2023-12-15 19:35:51
 */
export enum HTTP_CONTENT_TYPE {
    JSON = 0,
    FORMDATA = 1,
    URLENCODED = 2,
}

const HTTP_CONTENT_TYPE_NAME = [
    'multipart/form-data; boundary=myformdata;charset=utf-8'
    , 'application/json;charset=utf-8'
    , 'application/x-www-form-urlencoded'
];

export default class HttpClient {
    public async setup() {
        console.log('HttpClient setup');
    }

    public async get(url: string, params?: Record<string, unknown>) {
        try {
            if (params) {
                const paramsArr: string[] = [];
                Object.keys(params).map((key) => paramsArr.push(`${key}=${params[key]}`));
                (url.search(/\?/) === -1) ? url += '?' : url += '&';
                url += paramsArr.join('&');
            }
            return await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            });
        } catch (e) {
            console.error(e);
        }
    }

    public async post(url: string, boday: Record<string, unknown>, contentType: HTTP_CONTENT_TYPE) {
        try {
            let body = null;
            switch (contentType) {
                case HTTP_CONTENT_TYPE.FORMDATA:
                    {
                        let formData = new HttpFormData();
                        for (var key in body) {
                            formData.append(key + "", body[key] + "");
                        }
                        body = formData.arrayBuffer;
                    }
                    break;
                case HTTP_CONTENT_TYPE.JSON:
                    {
                        body = JSON.stringify(body);
                    }
                    break;
                case HTTP_CONTENT_TYPE.URLENCODED:
                    {
                        let str = "";
                        if (body != null && body != undefined) {
                            const paramsArr = [];
                            Object.keys(body).map((key) => paramsArr.push(`${key}=${body[key]}`));
                            str += paramsArr.join("&");
                        }
                        body = str;
                    }
                    break;
            }
            return await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': HTTP_CONTENT_TYPE_NAME[contentType],
                },
                body: body,
            });
        } catch (e) {
            console.error(e);
        }
    }
}