import libs from 'libs'

let initialState = {
    info: {}
}

const setState = (oldState, newState) => libs.clone(oldState, newState)

const detail = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_DETAIL': return setState(state, { info: action.detail })
        default: return state
    }
}

export default detail
