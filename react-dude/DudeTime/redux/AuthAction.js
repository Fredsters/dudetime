import {root} from "../constants/network"

export function newUser(user) {
    return dispatch => {
        dispatch(newUserBegin());
        return fetch(`${root}/users`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
            body: JSON.stringify(user),
        })
            .then(handleErrors)
            .then(res => res.json())
            // var cookie = res.headers.get("set-cookie");
            .then(json => {
                dispatch(newUserSuccess(json));
                return json;
            })
            .catch(error => dispatch(newUserFailure(error)));
    };
}

// export function updateUser(user) {
//     return dispatch => {
//         dispatch(updateUserBegin());
//         return fetch(`${root}/users`, {
//             method: 'PUT',
//             headers: {
//                 Accept: 'application/json',
//                 'Content-Type': 'application/json',
//             },
//             credentials: 'same-origin',
//             body: JSON.stringify(user),
//         })
//             .then(handleErrors)
//             .then(res => res.json())
//             // var cookie = res.headers.get("set-cookie");
//             .then(json => {
//                 dispatch(newUserSuccess(json));
//                 return json;
//             })
//             .catch(error => dispatch(newUserFailure(error)));
//     };
// }




// Handle HTTP errors since fetch won't.
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export const NEW_USER_BEGIN = 'NEW_USER_BEGIN';
export const NEW_USER_SUCCESS = 'NEW_USER_SUCCESS';
export const NEW_USER_FAILURE = 'NEW_USER_FAILURE';

export const newUserBegin = () => ({
    type: NEW_USER_BEGIN
});

export const newUserSuccess = user => ({
    type: NEW_USER_SUCCESS, user
});

export const newUserFailure = error => ({
    type: NEW_USER_FAILURE, error
});
