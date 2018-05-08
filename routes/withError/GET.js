module.exports = {
    authOnly: false,
    exec: async (requestData) => {
        // Exec undefined function
        someUndefinedFunction();

        return 123;
    }
};