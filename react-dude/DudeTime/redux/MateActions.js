import {root} from "../constants/network"


// export function createDummyMate() {
//     return dispatch => {
//         dispatch(mateDummy("Theresa"));
//     };
// }

export function fetchMates() {
    return dispatch => {
        dispatch(matesBegin());
        return fetch(`${root}/mates`, {
            method: "GET"
        })
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                dispatch(fetchMatesSuccess(json));
                //return json.mates;
            })
            .catch(error => dispatch(matesFailure(error)));
    };
}


export function createMate() {
    return dispatch => {
        dispatch(matesBegin());
        return fetch(`${root}/mates`, {
            method: "POST"
        })
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                dispatch(createMateSuccess(json.mate));
                return json.mate;
            })
            .catch(error => dispatch(matesFailure(error)));
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
