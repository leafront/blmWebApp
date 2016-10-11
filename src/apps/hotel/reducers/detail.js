import libs from 'libs'

let initialState = {
    data:{},
    id:-1,
    loading:true,
    roomId:-1
}

const setState = (oldState, newState) => libs.clone(oldState, newState)
const list = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_HOTEL_DETAIL': return setState(state, { data: action.data,loading:false})
        case 'TOGGLE_POPUP':
          return setState(state, {roomId:action.roomId})
        case 'TOGGLE_HOUSE_LIST':
          if(state.id!==action.index){
            return setState(state,{id:action.index})
          }
          return setState(state,{id:-1})
        default: return state
    }
}
export default list
