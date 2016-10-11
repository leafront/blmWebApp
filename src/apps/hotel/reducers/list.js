import libs from 'libs'

let initialState = {
    data:{},
    filterData:{},
    loading:true,
    locationData:{}
}

const setState = (oldState, newState) => libs.clone(oldState, newState)

const list = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_HOTEL_DATA': return setState(state, { data: action.data,loading: false})
        case 'GET_FILTER_DATA': return setState(state, { filterData: action.filterData })
        case 'GET_LOCATION_DATA': return setState(state,{locationData:action.locationData})
        default: return state
    }
}

export default list
