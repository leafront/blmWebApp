import libs from 'libs'

let initialState = {
    seats: [],
    selected: []
}

const setState = (oldState, newState) => libs.clone(oldState, newState)

const seat = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_SEAT_DATA': return setState(state, { seats: action.seats })
        case 'ADD_SEAT_TO_LIST': localStorage.setItem('selectedSeat', JSON.stringify(state.selected.concat(action.seat))); return setState(state, { selected: state.selected.concat(action.seat) })
        case 'DELETE_SEAT_FROM_LIST': localStorage.setItem('selectedSeat', JSON.stringify(state.selected.filter(seat => seat !== action.seat))); return setState(state, { selected: state.selected.filter(seat => seat !== action.seat) })
        case 'DELETE_ALL_SEAT_FROM_LIST': return setState(state, { selected: [] })
        case 'CLEAR_SEAT': return setState(state, initialState)
        default: return state
    }
}

export default seat
