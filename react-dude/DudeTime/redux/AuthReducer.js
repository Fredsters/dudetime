import { NEW_USER_BEGIN, NEW_USER_FAILURE, NEW_USER_SUCCESS } from './AuthAction';

const initialState = {
    user: {},
    id: null,
    error: null
};

export default function mateReducer(state = initialState, action) {
    switch (action.type) {
        case NEW_USER_BEGIN:
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

        case NEW_USER_FAILURE:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
}
