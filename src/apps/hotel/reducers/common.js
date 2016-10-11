import libs from 'libs'

let initialState = {
    active:"",
    hotelInfo:{
      "Facilities":"",
      "ThemeIds":"",
      "StarRate":0,
      "LowRate":"",
      "HighRate":"",
      "DistrictId":"",
      "BrandId":"",
      "Zone":"",
      "Sort":""
    }
}

const setState = (oldState, newState) => libs.clone(oldState, newState)

const common = (state = initialState, action) => {
    switch (action.type) {
      case 'TOGGLE_ACTIVE':
        return setState(state, {active:action.active})
      case 'GET_HOTEL_INFO':
        switch (action.name) {
          case 'brands':
            state.hotelInfo.BrandId = action.id;
            break;
          case 'facilities':
            state.hotelInfo.Facilities = action.id;
            break;
          case 'themes':
            state.hotelInfo.ThemeIds = action.id;
              break;
          case 'star':
            state.hotelInfo.StarRate = action.id;
            break;
          case 'price':
            state.hotelInfo.LowRate = action.id[0];
            state.hotelInfo.HighRate = action.id[1]
              break;
          case 'sort':
            state.hotelInfo.Sort = action.id;
            break;
          case 'districts':
            state.hotelInfo.DistrictId = action.id
            break;
          case 'commericalLocations':
            state.hotelInfo.Zone = action.id
           default:state.hotelInfo
        }
      return setState(state,{hotelInfo:state.hotelInfo})
        default: return state
    }
}

export default common
