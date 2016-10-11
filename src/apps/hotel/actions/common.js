// @flow
import libs from 'libs'
import request from 'superagent'
export const toggleActive = (active) => {
    return {
        type: 'TOGGLE_ACTIVE',active
    }
}

export const getHotelInfo = (name,id) => {
    return {
        type: 'GET_HOTEL_INFO', name , id
    }
}
