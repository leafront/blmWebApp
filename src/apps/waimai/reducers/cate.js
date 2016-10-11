import libs from 'libs'

let initialState = {
    subcates: [],
    current: 0,
    goods: {}
}

const setState = (oldState, newState) => libs.clone(oldState, newState)

const cate = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_SUBCATES_RETURN': return setState(state, { subcates: action.subcates })
        case 'SET_CURRENT_SUBCATE': return setState(state, { current: action.idx })
        case 'GET_GOODS_RETURN': return setState(state, { areaId: action.goods })
        default: return state
    }
}

export default cate
