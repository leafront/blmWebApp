import libs from 'libs'

let initialState = {
    confirmParams: {},
    phone: '',
    orderData: {}
}

const setState = (oldState, newState) => libs.clone(oldState, newState)

const confirm = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_CONFIRM_PARAMS': return setState(state, { confirmParams: action.confirmParams })
        case 'INPUT_PHONE': return setState(state, { phone: action.phone })
        case 'CONFIRM_ORDER': return setState(state, { orderData: action.data })
        default: return state
    }
}

export default confirm
