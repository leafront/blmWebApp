// @flow
import libs from 'libs'
import request from 'superagent'
import { Toast } from '@boluome/blm-web-components'
export const getHotelDetail = (channel, ArrivalDate, DepartureDate,HotelIds) => dispatch => {
    request.get(`${window.$config.HOST}/jiudian/v1/hotel/detail?channel=${channel}&ArrivalDate=${ArrivalDate}&DepartureDate=${DepartureDate}&HotelIds=${HotelIds || ''}`).end((err, res) => {
        if (!err && res.statusCode === 200) {
            if (res.body.code !== 0) return Toast(JSON.stringify(res.body.message))
            dispatch(getHotelDetailReturn(res.body.data))
        } else {
            Toast('outline','网络状况不好')
        }
    })
}

const getHotelDetailReturn = (data:object) => {
    return {
      type: 'GET_HOTEL_DETAIL', data
    }
}

export const toggleHouseList = (index) => {
    return {
      type: 'TOGGLE_HOUSE_LIST',index
    }
}

export const togglePopup = (roomId) => {
  return {
    type: 'TOGGLE_POPUP',roomId
  }
}
