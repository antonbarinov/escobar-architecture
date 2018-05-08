module.exports = async (requestData, renderFunc) => {
    console.log('Application server event: exec_route');

    const method = requestData._request.method;
    const funcToExec = renderFunc[method];

    if (funcToExec) {
        if (funcToExec.authOnly && !requestData._user) {
            requestData._clientResponse = __unauthorized(requestData, "You don't have access to this resource.");
            return false;
        }

        requestData._clientResponse = await funcToExec.exec(requestData);
    } else {
        requestData._clientResponse = __badRequest(requestData, `Method '${method}' is not supported for this endpoint`);
    }

    return true;
};