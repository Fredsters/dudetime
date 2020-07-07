import {root} from "../constants/network"
import { serverFetch } from "../network/server"

function addURIParams(URI, params) {
    if(Object.keys(params).length === 0) {
        return URI;
    }
    let isFirstParameter = true;
    for (const [key, value] of Object.entries(params)) {
        if(isFirstParameter) {
            URI = `${URI}?`;
            isFirstParameter = false;
        } else {
            URI = `${URI}&`;
        }
        URI = `${URI}${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    }
    return URI
}

export function fetchMates(params) {
    return async (dispatch) => {
        dispatch(matesBegin());
        const URI = addURIParams(`${root}/mates`, params);
        try {
            const response = await serverFetch(URI, "GET");
            dispatch(fetchMatesSuccess(response));
            return response;
        } catch (error) {
            dispatch(matesFailure(error));
        }
    };
}


export function createMate(mate) {
    return async (dispatch, getState) => {
        dispatch(matesBegin());
        return serverFetch(`${root}/mates`, 'POST', {...mate, owner: getState().auth.user.id})
            .then(json => {
                dispatch(createMateSuccess(json));
                return json;
            })
            .catch(error => dispatch(matesFailure(error)));
    };
}

export function resetMateCreate() {
    return (dispatch) => {
        dispatch(mateReset()); 
    };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export const MATES_BEGIN = 'MATES_BEGIN';
export const FETCH_MATES_SUCCESS = 'FETCH_MATES_SUCCESS';
export const MATES_FAILURE = 'MATES_FAILURE';
export const ACCEPT_MATE = 'ACCEPT_MATE';
export const CREATE_MATE = 'CREATE_MATE';
export const MATE_DUMMY = 'MATE_DUMMY';
export const MATE_RESET = 'MATE_RESET';

export const mateReset = () => ({
    type: MATE_RESET
});

export const matesBegin = () => ({
    type: MATES_BEGIN
});

export const fetchMatesSuccess = mates => ({
    type: FETCH_MATES_SUCCESS, mates
});

export const matesFailure = error => ({
    type: MATES_FAILURE, error
});

export const acceptMate = mateId => ({
    type: ACCEPT_MATE, mateId
});

export const createMateSuccess = mate => ({
    type: CREATE_MATE, mate
});


// export const mateDummy = data => ({
//     type: MATE_DUMMY, data
// });
