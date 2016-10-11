// @flow
import libs from 'libs'
import request from 'superagent'
import { Toast } from '@boluome/blm-web-components'

export const getHotelData = (getHotelData: getHoteType) => dispatch => {
    request.post(`${window.$config.HOST}/jiudian/v1/hotels`, {
        PageSize:getHotelData.PageSize,
        DistanceType:getHotelData.DistanceType,
        DepartureDate:getHotelData.DepartureDate,
        channel:getHotelData.channel,
        PageIndex:getHotelData.PageIndex,
        ArrivalDate:getHotelData.ArrivalDate,
        CityId:getHotelData.CityId,
        StarRate:getHotelData.StarRate,
        LowRate:getHotelData.LowRate,
        HighRate:getHotelData.HighRate,
        Facilities:getHotelData.Facilities,
        ThemeIds:getHotelData.ThemeIds,
        BrandId:getHotelData.BrandId,
        DistrictId:getHotelData.DistrictId,
        Zone:getHotelData.Zone,
        QueryText:getHotelData.QueryText,
        Sort:getHotelData.Sort,
        lng:getHotelData.lng,
        lat:getHotelData.lat
    }).end((err, res) => {
        if (!err && res.statusCode === 200) {
            if (res.body.code !== 0) return Toast('error',JSON.stringify(res.body.message))
            dispatch(getHotelDataReturn(res.body.data))
        } else {
            Toast('basic','网络状况不好')
        }
    })
}

const getHotelDataReturn = (data: Object,loading:boolean) => {
    return {
      type: 'GET_HOTEL_DATA', data,loading
    }
}

export const getFilterData = (channel) => dispatch => {
    request.get(`${window.$config.HOST}/jiudian/v1/filterConditions?channel=${channel}`).end((err, res) => {
        if (!err && res.statusCode === 200) {
            if (res.body.code !== 0) return Toast('error',JSON.stringify(res.body.message))
            dispatch(getFilterDataReturn(res.body.data))
        } else {
            Toast('basic','网络状况不好')
        }
    })
}

const getFilterDataReturn = (filterData:object) => {
    return {
        type: 'GET_FILTER_DATA', filterData
    }
}


export const getLocationData = (channel,cityId) => dispatch => {
    request.get(`${window.$config.HOST}/jiudian/v1/city/${cityId}/zones?channel=${channel}`).end((err, res) => {
        if (!err && res.statusCode === 200) {
            if (res.body.code !== 0) return Toast(JSON.stringify(res.body.message))
            dispatch(getLocationReturn(res.body.data))
        } else {
            Toast('网络状况不好')
        }
    })
}

const getLocationReturn = (locationData:object) => {
    return {
        type: 'GET_LOCATION_DATA', locationData
    }
}
