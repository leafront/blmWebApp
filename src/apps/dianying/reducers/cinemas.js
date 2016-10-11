import libs from 'libs'

let initialState = {
    data: []
}

const setState = (oldState, newState) => libs.clone(oldState, newState)

const cinemas = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CINEMAS_DATA': return setState(state, { data: action.data })
        case 'CLEAR_CINEMAS': return setState(state, { data: [] })
        default: return state
    }
}

export default cinemas
