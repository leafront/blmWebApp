import libs from 'libs'

let initialState = {
    data: {},
    showing: undefined
}

const setState = (oldState, newState) => libs.clone(oldState, newState)

const detail = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_FILM_DATA': return setState(state, { data: action.data, showing: action.showing })
        default: return state
    }
}

export default detail
