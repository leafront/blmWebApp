import libs from 'libs'

let initialState = {
    channelCurrent: 0,
    stores: [],
    page: 0,
    channel: 'ele'
}

const setState = (oldState, newState) => libs.clone(oldState, newState)

const home = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_NEAR_STORES': return setState(state, { stores: state.stores.concat(action.stores), page: state.page + 1 })
        default: return state
    }
}

export default home
