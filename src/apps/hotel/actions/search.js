// @flow
import libs from 'libs'
import request from 'superagent'
import { Toast } from '@boluome/blm-web-components'
export const getBrandList = (channel) => dispatch => {
    request.get(`${window.$config.HOST}/jiudian/v1/filterConditions?channel=${channel}`).end((err, res) => {
        if (!err && res.statusCode === 200) {
            if (res.body.code !== 0) return Toast(JSON.stringify(res.body.message))
            dispatch(getBrandListReturn(res.body.data))
        } else {
            Toast('网络状况不好')
        }
    })
}

const getBrandListReturn = (data:object) => {
    return {
        type: 'GET_BRAND_LIST', data
    }
}


export const getLocationList = (channel) => dispatch => {
    const cityId = JSON.parse(localStorage.getItem('HOTEL_INFO'))
    request.get(`${window.$config.HOST}/jiudian/v1/city/0201/zones?channel=${channel}`).end((err, res) => {
        if (!err && res.statusCode === 200) {
            if (res.body.code !== 0) return Toast(JSON.stringify(res.body.message))
            dispatch(getLocationListReturn(res.body.data))
        } else {
            Toast('网络状况不好')
        }
    })
}

const getLocationListReturn = (data:object) => {
    return {
        type: 'GET_LOCATION_LIST', data
    }
}
