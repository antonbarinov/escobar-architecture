const auth = require('../lib/auth');

const allowedForUnauthorized = {
    '/login': 1,
    '/logout': 1,
    '/getFileContent': 1
};

module.exports = async (requestData) => {
    // Get sessionId
    requestData._sessionId = requestData._request.headers.sessionid || requestData.$_GET.sessionId || requestData._http.getCookie(__sessionCookieName) || requestData._sessionId;

    // Auth check
    requestData._user = await auth(requestData);

    if (!requestData._user && !allowedForUnauthorized[requestData._route]) {
        requestData._clientResponse = __unauthorized(requestData, "You don't have access to this resource.");
        return false;
    }

    /**
     * If returned false, routing function will not be executed
     * requestData._clientResponse will be empty string
     * modify requestData._clientResponse if you don't want send to client empty string
     * server.onBeforeSendResponse also will be triggered
     */
    return true;
};