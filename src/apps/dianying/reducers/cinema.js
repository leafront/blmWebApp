import libs from 'libs'

let initialState = {
    info: {},
    films: undefined,
    plans: [],
    scheduleCurrent: 0,
    cinemaFilms: []
}

const setState = (oldState, newState) => libs.clone(oldState, newState)

const cinema = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CINEMA_INFO': return setState(state, { info: action.info })
        case 'GET_FILM_PLAN': return setState(state, { plans: action.plans })
        case 'GET_CINEMA_FILMS': return setState(state, {films: action.films})
        case 'CHANGE_SCHEDULE_TAB': return setState(state, { scheduleCurrent: action.idx })
        case 'GET_CINEMA_FILM': return setState(state, { cinemaFilms: action.data })
        case 'CLEAR_CINEMA': return setState(state, initialState)
        default: return state
    }
}

export default cinema
