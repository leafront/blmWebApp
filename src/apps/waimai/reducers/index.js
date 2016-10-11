import { combineReducers } from 'redux'
import home from './home'
import cate from './cate'
import detail from './detail'
// import cinema from './cinema'
// import seat from './seat'
import confirm from './confirm'

const reducers = combineReducers({
    home,
    cate,
    detail,
    // cinema,
    // seat,
    confirm
})

export default reducers
