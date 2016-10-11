// @flow
import libs from 'libs'
import request from 'superagent'
import { Toast } from '@boluome/blm-web-components'
export const getPhotoList = (channel, hotelId) => dispatch => {
    request.get(`${window.$config.HOST}/jiudian/v1/hotel/${hotelId}/images?channel=${channel}`).end((err, res) => {
        if (!err && res.statusCode === 200) {
            if (res.body.code !== 0) return Toast(JSON.stringify(res.body.message))
            dispatch(getPhotoListReturn(res.body.data,hotelId))
        } else {
            Toast('网络状况不好')
        }
    })
}

const getPhotoListReturn = (data:array,id:string) => {
    return {
        type: 'GET_PHOTO_LIST', data,id
    }
}
