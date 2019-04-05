import {combineReducers} from 'redux'
import mate from './MateReducer'
import auth from './AuthReducer'

export default combineReducers({
    mate,
    auth
})
