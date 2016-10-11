import libs from 'libs'

let initialState = {
    brandData:{},
    locationData:{},
    loading:true
}

const setState = (oldState, newState) => libs.clone(oldState, newState)

const list = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_BRAND_LIST': return setState(state, { brandData: action.data, loading:false})
        case 'GET_LOCATION_LIST': return setState(state ,{ locationData: action.data })
        default: return state
    }
}

export default list
