export interface WebResponseData {
    status: number;
    body?: any;
    error?: any;
}

export default class WebApi {

    request(url: string, method: string, responseType: XMLHttpRequestResponseType,
        onProgress?: (this: XMLHttpRequest, ev: any) => any) {

        return new Promise<WebResponseData>((resolve) => {
            const request = new XMLHttpRequest();
            request.responseType = responseType;
            request.open(method, url, true);
            request.onload = function onload() {
                resolve({
                    status: request.status,
                    body: request.response
                });
            };
            if (onProgress) {
                request.onprogress = onProgress;
            }

            request.onerror = function onerror(err) {
                resolve({
                    status: -1,
                    error: err,
                });
            };
            request.send(null);
        });
    }
}
