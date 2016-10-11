import libs from 'libs'

let initialState = {
    cardInfo:{},
    ipInfo:{}
}

const setState = (oldState, newState) => libs.clone(oldState, newState)

const photoList = (state = initialState, action) => {
    switch (action.type) {
        case 'CHECK_CREDIT_CARD':
          return setState(state, { cardInfo:action.data})
          break
        case 'GET_IP_ADDRESS':
          return setState(state,{ipInfo:action.data})
          break
        default: return state
    }
}

export default photoList
