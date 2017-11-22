global.__users = [
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

global.__sessions = {};

global.__sessionsByUserId = {};

global.__sessionCookieName = 'sessionId';