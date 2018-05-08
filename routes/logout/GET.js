module.exports = {
    authOnly: true,
    exec: async (requestData) => {
        const user = requestData._user;
        let sessionId = requestData._sessionId;

        delete __sessions[sessionId];
        delete __sessionsByUserId[user.id][sessionId];

        requestData._http.removeCookie(__sessionCookieName);

        return __successResponse({
            message: 'Success logout.'
        });
    }
};