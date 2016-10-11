import libs from 'libs'

let initialState = {
    headerCurrent: 0,
    channelCurrent: 0,
    city: {
        id: {kou: "53", zzw: "shanghai"},
        name: "上海"
    },
    point: [],
    channel: 'kou',
    listData: []
}

const setState = (oldState, newState) => libs.clone(oldState, newState)

const home = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CITY': return setState(state, { city: action.city })
        case 'SET_POINT': return setState(state, { point: action.point })
        case 'CHANGE_HEADER_TAB': return setState(state, { headerCurrent: action.idx, listData: action.data })
        case 'CHANGE_CHANNEL_TAB': return setState(state, { channelCurrent: action.idx, listData: action.data })
        case 'CHANGE_CHANNEL': return setState(state, { channel: action.channel })
        default: return state
    }
}

export default home
