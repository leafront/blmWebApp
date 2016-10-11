import { combineReducers } from 'redux'
import home from './home'
import list from './list'
import detail from './detail'
import photoList from './photoList'
import common from './common'
import introduce from './introduce'
import search from './search'
import order from './order'
const reducers = combineReducers({
    home,
    list,
    detail,
    common,
    photoList,
    introduce,
    search,
    order
})

export default reducers
