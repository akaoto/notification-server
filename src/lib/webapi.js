class WebApi {
    constructor(token=null) {
        this._routes = {
            "": new AccessToken(token)
        }
    }

    addRoute(url, resource) {
        url = this._normalizeUrl(url);
        this._routes[url] = resource;
    }

    serve(method, event) {
        const url = this._normalizeUrl(event.pathInfo ? event.pathInfo : "");
        let resource = this._routes[url];
        if (!resource) {
            resource = new WebResource();
        }

        let resp = null;
        const payload = event.postData ? JSON.parse(event.postData.contents) : {};
        if (method == "GET") {
            resp = resource.onGet(payload);
        } else if (method == "POST") {
            resp = resource.onPost(payload);
        }
        return this._createResponse(resp);
    }

    _normalizeUrl(url) {
        if (!url.startsWith("/")) {
            url = "/" + url;
        }
        if (url.endsWith("/")) {
            url = url.slice(0, -1);
        }
        return url;
    }

    _createResponse(payload) {
        let resp = ContentService.createTextOutput();
        resp.setMimeType(ContentService.MimeType.JSON);
        resp.setContent(JSON.stringify(payload));
        return resp;
    };
}

class WebResource {
    onGet(payload) {
        return {"code": 404};
    }

    onPost(payload) {
        return {"code": 404};
    }
}

class AccessToken extends WebResource {
    constructor(token) {
        super();
        this._token = token;
    }

    onPost(payload) {
        const token = payload["api_token"] ? payload["api_token"] : "";
        if (token != this._token) {
            return {"code": 401};
        }
        return {
            "code": 200,
            "access_token": ScriptApp.getOAuthToken()
        };
    }
}
