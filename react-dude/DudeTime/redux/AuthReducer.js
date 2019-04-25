import { USER_BEGIN, USER_FAILURE, NEW_USER_SUCCESS, UPDATE_USER_SUCCESS, UPDATE_USER_IMAGE_SUCCESS } from './AuthAction';

const initialState = {
    user: {},
    id: null,
    error: null
};

export default function mateReducer(state = initialState, action) {
    switch (action.type) {
        case USER_BEGIN:
            return {
                ...state,
            };
        case NEW_USER_SUCCESS:
            return {
                ...state,
                user: {
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
        default:
            return state;
    }
}
