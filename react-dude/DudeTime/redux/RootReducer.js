import {combineReducers} from 'redux'
import mate from './MateReducer'
import auth from './AuthReducer'
import ui from './UiReducer'

export default combineReducers({
    mate,
    auth,
    ui
})
