import { combineReducers } from 'redux'
import home from './home'
import detail from './detail'
import cinemas from './cinemas'
import cinema from './cinema'
import seat from './seat'
import confirm from './confirm'

const reducers = combineReducers({
    home,
    detail,
    cinemas,
    cinema,
    seat,
    confirm
})

export default reducers
