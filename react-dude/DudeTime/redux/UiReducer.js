import {TOGGLE_CREATE_BUTTON} from './UiActions';

const initialState = {
    createButtonShow: true
};

export default function uiReducer(state = initialState, action) {
    state.type = action.type;
    switch (action.type) {
        case TOGGLE_CREATE_BUTTON: 
            return {
                ...state,
                createButtonShow: action.show
            };
        default:
            return state;
    }
}
