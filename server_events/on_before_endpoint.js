const auth = require('../lib/auth');

module.exports = async (requestData) => {
    console.log('Application server event: before_endpoint');

    // Get sessionId
    requestData._sessionId =
        requestData._request.headers.sessionid
        || requestData.$_GET.sessionId
        || requestData._http.getCookie(__sessionCookieName)
        || requestData._sessionId;

    // Auth check
    requestData._user = await auth(requestData);
};