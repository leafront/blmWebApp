// @flow
import libs from 'libs'
import request from 'superagent'
import { Toast } from '@boluome/blm-web-components'
export const tabChannel = (channelCode:string,index:number) =>{
  return {
    type: 'TAB_CHANNEL',channelCode,index
  }
}

export const setCity = (city: Object) => {
    return {
        type: 'SET_CITY', city
    }
}

export const getChannel = () => dispatch => {
    request.get(`${window.$config.HOST}/jiudian/v1/channels`).end((err, res) => {
        if (!err && res.statusCode === 200) {
            if (res.body.code !== 0) return alert(JSON.stringify(res.body.message))
            dispatch(getChannelReturn(res.body.data))
        } else {
            alert('网络状况不好')
        }
    })
}

const getChannelReturn = (getChannel) => {
    return {
        type: 'GET_CHANNEL', getChannel
    }
}


export const getLocationData = (channel) =>dispatch =>{
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success=>{
          const latitude = success.coords.latitude
          const longitude =success.coords.longitude
          let hotelInfo = JSON.parse(localStorage.getItem('HOTEL_INFO')) || {}
          hotelInfo.lat = latitude
          hotelInfo.lng = longitude
          localStorage.setItem('HOTEL_INFO',JSON.stringify(hotelInfo))
          request.get(`${window.$config.HOST}/basis/v1/getCityByPosition?longitude=${longitude}&latitude=${latitude}`).end((err, res) => {
            if (!err && res.statusCode === 200) {
                if (res.body.code !== 0) return alert(JSON.stringify(res.body.message))
                dispatch(getLocationReturn(res.body.data))
                const cityName = res.body.data.result.addressComponent.city.slice(0,-1)
                request.get(`${window.$config.HOST}/jiudian/v1/cities/${cityName}/id?channel=${channel}`).end((err, success) => {
                    if (!err && success.statusCode === 200) {
                        if (success.body.code !== 0) return Toast('error',JSON.stringify(success.body.message))
                        dispatch(getCityIdReturn(success.body.data))
                    } else {
                        alert('网络状况不好')
                    }
                })
            } else {
                Toast('erro','网络状况不好')
            }
          })
        },error =>{
          Toast('error','地理位置定位失败')
        })

    }else{
      Toast('error','浏览器不支持地理定位')
    }
}

const getLocationReturn = (address) => {
    return {
        type: 'GET_LOCATION', address
    }
}

const getCityIdReturn = (cityId) => {
    return {
        type: 'GET_CITY_ID', cityId
    }
}
