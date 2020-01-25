import { root } from "../constants/network"
import { serverFetch } from "../network/server"

export function newUser(user) {
    return async (dispatch) => {
        dispatch(userBegin());
        return serverFetch(`${root}/users`, 'POST', user)
            .then(json => {
                dispatch(newUserSuccess(json));
                return json;
            })
            .catch(error => dispatch(userFailure(error)));
    };
}

export function updateUser(user) {
    return async (dispatch) => {
        dispatch(userBegin());
        return serverFetch(`${root}/users`, 'PATCH', user)
            .then(json => {
                dispatch(updateUserSuccess(json));
                return json;
            })
            .catch(error => dispatch(userFailure(error)));
    };
}

export function updateProfilePicture(picturePath) {
    return async (dispatch) => {
        dispatch(userBegin());
        return serverFetch(`${root}/users/profilePicture`, 'PATCH', picturePath)
            .then(json => {
                dispatch(updateUserImageSuccess(json.picturePath));
                return json;
            })
            .catch(error => dispatch(userFailure(error)));
    };
}

export function fetchUsers() {
    return async (dispatch) => {
        dispatch(userBegin());
        return serverFetch(`${root}/users`, 'GET')
            .then(json => {
                dispatch(fetchUsersSuccess(json));
                return json;
            })
            .catch(error => dispatch(userFailure(error)));
    };
}

export function updateUserContacts(contacts) {
    return async (dispatch) => {
        dispatch(userBegin());
        return serverFetch(`${root}/users/contacts`, 'PATCH', contacts)
            .then(json => {
                dispatch(updateContacts(json));
                return json;
            })
            .catch(error => dispatch(userFailure(error)));
    };
}

export function fetchUserContacts() {
    return async (dispatch) => {
        dispatch(userBegin());
        return serverFetch(`${root}/users/contacts`, 'GET')
            .then(json => {
                dispatch(updateContacts(json));
                return json;
            })
            .catch(error => dispatch(userFailure(error)));
    };
}


export const USER_BEGIN = 'USER_BEGIN';
export const USER_FAILURE = 'USER_FAILURE';
export const NEW_USER_SUCCESS = 'NEW_USER_SUCCESS';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_IMAGE_SUCCESS = 'UPDATE_USER_IMAGE_SUCCESS';
export const STORE_AUTH_INFO = 'STORE_AUTH_INFO';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const CLEAR_USER = 'CLEAR_USER';
export const USER_CONTACTS = 'USER_CONTACTS';

export const userBegin = () => ({
    type: USER_BEGIN
});

export const userFailure = error => ({
    type: USER_FAILURE, error
});

export const newUserSuccess = user => ({
    type: NEW_USER_SUCCESS, user
});

export const updateUserSuccess = user => ({
    type: UPDATE_USER_SUCCESS, user
});

export const updateUserImageSuccess = picturePath => ({
    type: UPDATE_USER_IMAGE_SUCCESS, picturePath
});

export const storeAuthInfo = authInfo => ({
    type: STORE_AUTH_INFO, authInfo
});

export const fetchUsersSuccess = users => ({
    type: FETCH_USER_SUCCESS, users
});

export const clearUser = () => ({
    type: CLEAR_USER
});

export const updateContacts = (user) => ({
    type: USER_CONTACTS, user
});

