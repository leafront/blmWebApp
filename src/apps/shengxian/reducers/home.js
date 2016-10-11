import libs from 'libs'

let initialState = {
    cates: [],
    areaId: '',
    channel: 'yiguo'
}

const setState = (oldState, newState) => libs.clone(oldState, newState)

const home = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CATE': return setState(state, { cates: action.cates })
        case 'SET_CITY': return setState(state, { areaId: action.areaId })
        default: return state
    }
}

export default home
