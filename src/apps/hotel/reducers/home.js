import libs from 'libs'

let initialState = {
    getChannel:{},
    channelCode:'qunar',
    index:0,
    city:{},
    address:''
}

const setState = (oldState, newState) => libs.clone(oldState, newState)

const home = (state = initialState, action) => {
    let hotelInfo = JSON.parse(localStorage.getItem('HOTEL_INFO')) || {}
    switch (action.type) {
      case 'SET_CITY': return setState(state, { city: action.city })
      case 'GET_CHANNEL':
        return setState(state,{getChannel:action.getChannel})
      case 'TAB_CHANNEL':
        return setState(state,{channelCode:action.channelCode,index:action.index})
      case 'GET_LOCATION':
        const location = action.address.result
        hotelInfo.address = location.formatted_address
        localStorage.setItem('HOTEL_INFO',JSON.stringify(hotelInfo))
        return setState(state,{address:location.formatted_address})
        case 'GET_CITY_ID':
        hotelInfo.cityId = action.cityId
        hotelInfo.DistanceType = 0
        localStorage.setItem('HOTEL_INFO',JSON.stringify(hotelInfo))
        default: return state
    }
}
export default home
