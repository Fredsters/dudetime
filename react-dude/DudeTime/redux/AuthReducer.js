import {
    CLEAR_USER,
    FETCH_USER_SUCCESS,
    FETCH_CURRENT_USER_SUCCESS,
    NEW_USER_SUCCESS,
    STORE_AUTH_INFO,
    USER_CONTACTS,
    UPDATE_USER_IMAGE_SUCCESS,
    UPDATE_USER_SUCCESS,
    USER_BEGIN,
    USER_FAILURE
} from './AuthActions';

const initialState = {
    user: {},
    id: null,
    error: null
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case USER_BEGIN:
            return {
                ...state,
            };
        case NEW_USER_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    id: action.user._id,
                    phoneNumber: action.user.phoneNumber,
                    userName: action.user.userName,
                    picturePath: action.user.picturePath
                }
            };
        case USER_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    phoneNumber: action.user.phoneNumber,
                    userName: action.user.userName
                }
            };
        case UPDATE_USER_IMAGE_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    picturePath: action.picturePath
                }
            };

        case STORE_AUTH_INFO:
            return {
                ...state,
                user: {
                    ...state.user,
                    accessToken: action.authInfo.accessToken,
                    idToken: action.authInfo.idToken,
                    authId: action.authInfo.authId
                }
            };
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user
                    // userContacts: action.users
                }
            };
        case FETCH_CURRENT_USER_SUCCESS:
            return {
                ...state,
                user: {
                    ...action.user
                }
            };
        case CLEAR_USER:
            return {
                ...state,
                user: null
            };
        case USER_CONTACTS:
            return {
                ...state,
                user: {
                    ...state.user,
                    userContacts: action.user.contacts,
                }
            };
        default:
            return state;
    }
}
