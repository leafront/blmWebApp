import libs from 'libs'

let initialState = {
    data:[],
    id:''
}

const setState = (oldState, newState) => libs.clone(oldState, newState)

const photoList = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_PHOTO_LIST':
          return setState(state, { data:action.data,id:action.id})
        default: return state
    }
}

export default photoList
