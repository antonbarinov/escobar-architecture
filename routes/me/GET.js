module.exports = async (requestData) => {
    // Return response string that will be delivered to the client
    return __successResponse({
        data: requestData._user
    });
};