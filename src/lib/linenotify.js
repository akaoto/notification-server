class LineNotify {
    constructor(accessToken) {
        this._accessToken = accessToken;
        this._url = "https://notify-api.line.me"
    }

    request(method, endpoint, payload) {
        let options = {
            method: method,
            headers: {
                Authorization: `Bearer ${this._accessToken}`
            }
        };
        if (payload) {
            options["payload"] = payload;
        }
        UrlFetchApp.fetch(this._url + endpoint, options);
    }

    notify(message) {
        let payload = {
            "message": message
        }
        this.request("POST", "/api/notify", payload)
    }
}
