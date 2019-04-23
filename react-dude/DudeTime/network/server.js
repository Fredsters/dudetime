export function serverFetch(path, method, body) {
    const options = {
        method: method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'same-origin'
    }
    if (body && method !== "GET") {
        options.body = JSON.stringify(body);
    }

    return fetch(path, options)
        .then(handleErrors)
        .then(res => res.json());
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
