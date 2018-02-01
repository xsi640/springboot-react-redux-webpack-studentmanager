const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json', };

export const get = (url, parameters = {}, resolve, reject) => {
    url += '?';
    for (let key in parameters) {
        url += encodeURI(key) + '=' + encodeURI(parameters[key]) + '&';
    }
    url += 'd=' + new Date().getTime();
    fetch(url, { method: 'GET', headers: headers })
        .then(resp => resp.json())
        .then(json => resolve(json))
        .catch(err => reject(err));
}

export const post = (url, parameters = {}, resolve, reject) => {
    url += '?d=' + new Date().getTime();
    let formData = new FormData();
    for (let key in parameters) {
        formData.append(key, parameters[key]);
    }
    fetch(url, { method: 'POST', headers: headers, body: formData })
        .then(resp => resp.json())
        .then(json => resolve(json))
        .catch(err => reject(err));
}