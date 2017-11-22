module.exports = async (requestData, renderFunc) => {
    renderFunc = renderFunc(requestData);
    const method = requestData._request.method;
    const funcToExec = renderFunc[method];

    if (funcToExec) {
        requestData._clientResponse = await funcToExec(requestData);
    } else {
        requestData._clientResponse = __badRequest(requestData, `Method '${method}' is not supported for this endpoint`);
    }

    return true;
};