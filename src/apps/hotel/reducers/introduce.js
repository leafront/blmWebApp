import libs from 'libs'

let initialState = {
    data:{},
    hotelId:'',
    loading:true,
}

const setState = (oldState, newState) => libs.clone(oldState, newState)

const photoList = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_INTRODUCE_DATA':
          return setState(state, { data:action.data,hotelId:action.hotelId,loading:false})
        default: return state
    }
}

export default photoList
