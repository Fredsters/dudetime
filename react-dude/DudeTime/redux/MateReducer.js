import {ACCEPT_MATE, CREATE_MATE, FETCH_MATES_SUCCESS, MATES_BEGIN, MATES_FAILURE} from './MateActions';

const initialState = {
    mates: [],
    loading: true,
    error: null
};

export default function mateReducer(state = initialState, action) {
    switch (action.type) {
        case MATES_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_MATES_SUCCESS:
            return {
                ...state,
                loading: false,
                mates: action.mates
            };

        case MATES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
                mates: []
            };
        case CREATE_MATE:
            return {
                ...state,
                loading: false,
                mates: [...state.mates, action.mate]
            };
        case ACCEPT_MATE:

            const {mates} = state;

            let mate = mates.find((mate) => {
                return action.mateId === mate._id;
            });
            //todo add current user
            //mate.participants.push(new user)
            mate.hasUpdate = true;
            return {
                ...state,
                bla: "bla"
            };
        default:
            // ALWAYS have a default case in a reducer
            return state;
    }
}
