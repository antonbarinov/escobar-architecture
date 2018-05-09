module.exports = {
    authOnly: false,
    exec: async (requestData) => {
        return requestData.$_FILES;
    }
};