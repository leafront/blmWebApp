// @flow
import libs from 'libs'
import request from 'superagent'
import { Toast } from '@boluome/blm-web-components'
export const getIntroduceData = (channel, hotelId) => dispatch => {
    request.get(`${window.$config.HOST}/jiudian/v1/hotel/${hotelId}/info?channel=${channel}`).end((err, res) => {
        if (!err && res.statusCode === 200) {
            if (res.body.code !== 0) return Toast(JSON.stringify(res.body.message))
            dispatch(getIntroduceDataReturn(res.body.data,hotelId))
        } else {
            Toast('网络状况不好')
        }
    })
}

const getIntroduceDataReturn = (data:object,hotelId) => {
    return {
          type: 'GET_INTRODUCE_DATA', data,hotelId
    }
}
