function init() {
    const apiToken = PropertiesService.getScriptProperties().getProperty("NOTIFICATION_SERVER_API_TOKEN")
    webApi = new WebApi(apiToken);
    webApi.addRoute("/line/notify", new LineNotifyResource());
    return webApi;
}

function doGet(event) {
    let webApi = init();
    return webApi.serve("GET", event);
}

function doPost(event) {
    let webApi = init();
    return webApi.serve("POST", event);
}

class LineNotifyResource extends WebResource {
    constructor() {
        super();
        const accessToken = PropertiesService.getScriptProperties().getProperty("LINE_NOTIFY_ACCESS_TOKEN")
        this._lineNotify = new LineNotify(accessToken);
    }

    onPost(body) {
        this._lineNotify.notify(body["message"]);
        return { "code": 200 };
    }
}
