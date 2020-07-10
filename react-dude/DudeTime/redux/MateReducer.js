import {ACCEPT_MATE, CREATE_MATE, FETCH_OPEN_MATES_SUCCESS, FETCH_CLOSED_MATES_SUCCESS, MATES_BEGIN, MATES_FAILURE, MATE_RESET} from './MateActions';

const initialState = {
    openMates: [],
    closedMates: [],
    loading: true,
    error: null
};

export default function mateReducer(state = initialState, action) {
    state.type = action.type;
    switch (action.type) {
        case MATE_RESET: 
            return {
                ...state,
                mateCreated: false
            };
        case MATES_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_OPEN_MATES_SUCCESS:
            return {
                ...state,
                loading: false,
                openMates: action.openMates
            };
        case FETCH_CLOSED_MATES_SUCCESS:
            return {
                ...state,
                loading: false,
                closedMates: action.closedMates
            };
        case MATES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case CREATE_MATE:
            return {
                ...state,
                loading: false,
                mateCreated: true
            };
        case ACCEPT_MATE:
            const {closedMates, openMates} = state;
            
            state.openMates = openMates.filter(item => item.id !== action.mate._id);
            const newClosedMates = [...closedMates.filter(item => item.id !== action.mate._id), action.mate];
            console.log(newClosedMates);
            newClosedMates.sort((a,b) => b.time < a.time);
            state.closedMates = newClosedMates;
            return {
                ...state,
                loading: false
            };
        default:
            // ALWAYS have a default case in a reducer
            return state;
    }
}
