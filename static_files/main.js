function objectsToQueryString(obj) {
    return Object.keys(obj).map(function (key) {
        return encodeURIComponent(key) + '=' +
            encodeURIComponent(obj[key]);
    }).join('&');
}

const apiRequest = (method = 'GET', url, data = null) => new Promise((resolve, reject) => {
    try {
        method = method.toUpperCase();
        const xhr = new XMLHttpRequest();
        if (method == 'GET' && data && typeof data == 'object') {
            if (url.indexOf('?') == -1) url += '?';
            url += objectsToQueryString(data);
            data = null;
        }
        xhr.open(method.toUpperCase(), url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.send(data);

        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) return;

            if (xhr.status != 200) {
                reject(xhr);
            } else {
                let data;
                try {
                    data = JSON.parse(xhr.responseText);
                    resolve({data, xhr});
                } catch (e) {
                    reject(e);
                }
            }
        }
    } catch (e) {
        reject(e);
    }
});

const loginOk = async () => {
    let res;
    let text = '';
    try {
        res = await apiRequest('POST', '/login', JSON.stringify({
            userName: "admin",
            password: "admin"
        }));
        text = JSON.stringify(res.data, null, '\t');
    } catch (e) {
        text = JSON.stringify(JSON.parse(e.responseText), null, '\t');
    }

    document.getElementById('output').innerText = "/login response: \r\n";
    document.getElementById('output').innerText = text;
};

const loginFail = async () => {
    let res;
    let text = '';
    try {
        res = await apiRequest('POST', '/login', JSON.stringify({
            userName: "admin",
            password: "adminasd"
        }));
        text = JSON.stringify(res.data, null, '\t');
    } catch (e) {
        text = JSON.stringify(JSON.parse(e.responseText), null, '\t');
    }

    document.getElementById('output').innerText = "/login response: \r\n";
    document.getElementById('output').innerText = text;
};

const me = async () => {
    let res;
    let text = '';
    try {
        res = await apiRequest('GET', '/me');
        text = JSON.stringify(res.data, null, '\t');
    } catch (e) {
        text = JSON.stringify(JSON.parse(e.responseText), null, '\t');
    }

    document.getElementById('output').innerText = "/me response: \r\n";
    document.getElementById('output').innerText = text;
};

const logout = async () => {
    let res;
    let text = '';
    try {
        res = await apiRequest('GET', '/logout');
        text = JSON.stringify(res.data, null, '\t');
    } catch (e) {
        text = JSON.stringify(JSON.parse(e.responseText), null, '\t');
    }

    document.getElementById('output').innerText = "/logout response: \r\n";
    document.getElementById('output').innerText = text;
};

