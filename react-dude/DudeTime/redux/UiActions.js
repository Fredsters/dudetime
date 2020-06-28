export function toggleCreateButton(show) {
    return (dispatch) => {
        dispatch(_toggleCreateButton(show)); 
    };
}

export const TOGGLE_CREATE_BUTTON = 'TOGGLE_CREATE_BUTTON';

const _toggleCreateButton = (show) => ({
    type: TOGGLE_CREATE_BUTTON, show
});