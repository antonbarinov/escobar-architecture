module.exports = async (requestData) => {
    let user = false;
    const sessionId = requestData._sessionId;

    if (sessionId) {
        user = __sessions[sessionId] || false;
    }

    return user;
};