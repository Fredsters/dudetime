export function serverFetch(path, method, body) {
    const options = {
        method: method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    }
    if (body && method !== "GET") {
        options.body = JSON.stringify(body);
    }

    return fetch(path, options)
        .then(handleErrors)
        .then(res => {
            //todo put this in async storage??
            console.log(res.headers.get('set-cookie'));
            return res.json()
        }
        );
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
