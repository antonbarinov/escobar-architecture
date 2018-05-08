const users = [
    {
        id: 1,
        userName: 'admin',
        hash: __getUserHash('admin', 'admin') // Password 'admin'
    },
    {
        id: 2,
        userName: 'user',
        hash: __getUserHash('admin', 'user') // Password 'user'
    },
];

module.exports = {
    authOnly: false,
    exec: async (requestData) => {
        if (requestData._user) {
            return __badRequest(requestData, 'You are already logged in.');
        }

        const data = requestData.$_DATA;

        const validation = __validateRequiredFields({
            userName: 'string',
            password: 'string'
        }, data);

        if (validation !== true) {
            return __badRequest(requestData,  validation);
        }

        const userName = data.userName;
        const password = data.password;

        let sessionId = false;
        let $user = false;
        const hash = __getUserHash(userName, password);

        users.forEach((user) => {
            if (user.hash == hash) {
                sessionId = __getRandomHash();
                __sessions[sessionId] = user;
                $user = user;
                if (__sessionsByUserId[user.id] == undefined) __sessionsByUserId[user.id] = {};
                __sessionsByUserId[user.id][sessionId] = 1;
            }
        });

        if (!$user) {
            return __unauthorized(requestData, 'Invalid userName or password.');
        }

        requestData._http.setCookie(__sessionCookieName, sessionId);

        return __successResponse({
            data: {
                sessionId,
                user: $user,
            }
        });
    }
};