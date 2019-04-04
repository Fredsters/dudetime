export function fetchMates() {
    return dispatch => {
        dispatch(fetchMatesBegin());
        return fetch("http://10.18.140.149:3000/mates", {
            method: "GET"
        })
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                dispatch(fetchMatesSuccess(json));
                return json.mates;
            })
            .catch(error => dispatch(fetchMatesFailure(error)));
    };
}


// Handle HTTP errors since fetch won't.
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export const FETCH_MATES_BEGIN = 'FETCH_MATES_BEGIN';
export const FETCH_MATES_SUCCESS = 'FETCH_MATES_SUCCESS';
export const FETCH_MATES_FAILURE = 'FETCH_MATES_FAILURE';
export const ACCEPT_MATE = 'ACCEPT_MATE';

export const fetchMatesBegin = () => ({
    type: FETCH_MATES_BEGIN
});

export const fetchMatesSuccess = mates => ({
    type: FETCH_MATES_SUCCESS,
    payload: {mates}
});

export const fetchMatesFailure = error => ({
    type: FETCH_MATES_FAILURE,
    payload: {error}
});

export const acceptMate = mateId => ({
    type: ACCEPT_MATE,
    payload: {mateId}
});
