// @flow
import libs from 'libs'
import request from 'superagent'
import { Toast } from '@boluome/blm-web-components'
import { browserHistory } from 'react-router'

export const clearState = (page) => {
    return {
        type: 'CLEAR_' + page
    }
}

export const setCity = (city: Object) => {
    return {
      type: 'SET_CITY', city
    }
}

export const setPoint = (point: Array<number>) => {
    return {
        type: 'SET_POINT', point
    }
}

const getSupplier = (channelCurrent: number) => {
    let supplier: string = ''
    channelCurrent === 0 ? supplier = 'kou' : supplier = 'zzw'
    return supplier
}

const getCityId = (channel: string, city: Object) => {
    let cityId: string = ''
    if (city && Object.keys(city.id).length !== 0) {
      cityId = city.id[channel]
      if(!cityId) {
        Toast('error', '不支持此城市')
      }
    }
    return cityId
}

const getReqUrl = (headerCurrent: number, channelCurrent: number, city: Object) => {
    let reqUrl: string = ''
      headerCurrent === 0 ? reqUrl = `/dianying/v1/film/showing?channel=${getSupplier(channelCurrent)}&cityId=${getCityId(getSupplier(channelCurrent), city)}`
    : headerCurrent === 1 ? reqUrl = `/dianying/v1/film/coming?channel=${getSupplier(channelCurrent)}&cityId=${getCityId(getSupplier(channelCurrent), city)}`
    : headerCurrent === 2 ? reqUrl = `/dianying/v1/cinemas?channel=${getSupplier(channelCurrent)}&cityId=${getCityId(getSupplier(channelCurrent), city)}&latitude=${localStorage.lat}&longitude=${localStorage.lon}` : ''
    return reqUrl
}

export const changeHeaderTab = (headerCurrent: number, channelCurrent: number, city: Object) => (dispatch: Function) => {
    request.get(window.$config.HOST + getReqUrl(headerCurrent, channelCurrent, city)).end((err, res) => {
        if (!err && res.statusCode === 200) {
            if (res.body.code !== 0) return alert(JSON.stringify(res.body.message))
            dispatch(changeHeaderTabReturn(headerCurrent, res.body.data))
        }
    })
}

export const changeChannelTab = (headerCurrent: number, channelCurrent: number, city: Object) => (dispatch: Function) => {
    request.get(window.$config.HOST + getReqUrl(headerCurrent, channelCurrent, city)).end((err, res) => {
        if (!err && res.statusCode === 200) {
            if (res.body.code !== 0) return alert(JSON.stringify(res.body.message))
            dispatch(changeChannelTabReturn(channelCurrent, res.body.data))
            dispatch(changeChannelReturn(channelCurrent === 0 ? 'kou' : 'zzw'))
        }
    })
}

const changeHeaderTabReturn = (idx: number, data: Array<Object>) => {
    return {
        type: 'CHANGE_HEADER_TAB', idx, data
    }
}

const changeChannelTabReturn = (idx: number, data: Array<Object>) => {
    return {
        type: 'CHANGE_CHANNEL_TAB', idx, data
    }
}

const changeChannelReturn = (channel: string) => {
    return {
        type: 'CHANGE_CHANNEL', channel
    }
}

export const getFilmData = (channel: string, filmId: number, type: number) => dispatch => {
    type == 0 ? type = 'showing' : type = 'coming'
    request.get(`${window.$config.HOST}/dianying/v1/film/${type}/${filmId}?channel=${channel}&filmId=${filmId}`).end((err, res) => {
        if (!err && res.statusCode === 200) {
            if (res.body.code !== 0) return alert(res.body.message)
            dispatch(getFilmDataReturn(res.body.data, type === 'showing' ? true : false))
        } else {
            alert('网络状况不好')
        }
    })
}

const getFilmDataReturn = (data: Object, showing: bool) => {
    return {
        type: 'GET_FILM_DATA', data, showing
    }
}

export const getCinemasData = (channel: string, filmId: string, cityId: string) => dispatch => {
    request.get(`${window.$config.HOST}/dianying/v1/cinemas?channel=${channel}&cityId=${cityId}&filmId=${filmId || ''}&latitude=${localStorage.lat}&longitude=${localStorage.lon}`).end((err, res) => {
        if (!err && res.statusCode === 200) {
            if (res.body.code !== 0) return alert(JSON.stringify(res.body.message))
            dispatch(getCinemasDataReturn(res.body.data.cinemas))
        } else {
            alert('网络状况不好')
        }
    })
}

const getCinemasDataReturn = (data: Array<Object>) => {
    return {
        type: 'GET_CINEMAS_DATA', data
    }
}

export const getFilmPlan = (channel, cinemaId, filmId, cityId) => dispatch => {
    request.get(`${window.$config.HOST}/dianying/v1/cinema/${cinemaId}/film/${filmId}/plans?channel=${channel}&cinemaId=${cinemaId}&filmId=${filmId || ''}&cityId=${cityId}`).end((err, res) => {
        if (!err && res.statusCode === 200) {
            if (res.body.code !== 0) return alert(JSON.stringify(res.body.message))
            dispatch(getFilmPlanReturn(res.body.data))
            dispatch(changeScheduleTab(0))
        } else {
            alert('网络状况不好')
        }
    })
}

const getFilmPlanReturn = (plans: Array<Object>) => {
    return {
        type: 'GET_FILM_PLAN',
        plans,
    }
}

export const getCinemaInfo = (channel, cinemaId, cityId, filmId) => dispatch => {
    request.get(`${window.$config.HOST}/dianying/v1/cinema/${cinemaId}/films?channel=${channel}&cityId=${cityId}`).end((err, res) => {
        if (!err && res.statusCode === 200) {
            if (res.body.code !== 0) return alert(JSON.stringify(res.body.message))
            if (res.body.code === 0 && res.body.data.films.length === 0) {
                alert('该影院暂无影片信息，即将返回')
                return browserHistory.goBack()
            }
            dispatch(getCinemaInfoReturn(res.body.data.cinemaInfo))
            dispatch(getCinemafilmsReturn(res.body.data.films))
            if (filmId) {
                dispatch(getFilmPlan(channel, cinemaId, filmId, cityId))
            } else {
                dispatch(getFilmPlan(channel, cinemaId, res.body.data.films[0].id, cityId))
            }
        } else {
            alert('网络状况不好')
        }
    })
}

const getCinemaInfoReturn = (info: Object) => {
    return {
        type: 'GET_CINEMA_INFO', info
    }
}

const getCinemafilmsReturn = (films: array) => {
    return {
        type: 'GET_CINEMA_FILMS', films
    }
}

export const changeScheduleTab = (idx: number) => {
    return {
        type: 'CHANGE_SCHEDULE_TAB', idx
    }
}

export const getSeatData = (channel: string, showId: string, cinemaId: string, hallId: string) => dispatch => {
    request.get(`${window.$config.HOST}/dianying/v1/cinema/${cinemaId}/hall/${hallId}/plan/${showId}/seats?channel=${channel}&planId=${showId}&cinemaId=${cinemaId}&hallId=${hallId}`).end((err, res) => {
        if (!err && res.statusCode === 200) {
            if (res.body.code !== 0) return alert(JSON.stringify(res.body.message))
            dispatch(getSeatDataReturn(res.body.data))
        } else {
            alert('网络状况不好')
        }
    })
}

const getSeatDataReturn = (seats) => {
    return {
        type: 'GET_SEAT_DATA', seats
    }
}

const getCinemaFilmReturn = (data: Array<Object>) => {
    return {
        type: 'GET_CINEMA_FILM', data
    }
}

export const addSeatToList = (seat: Object) => {
    return {
        type: 'ADD_SEAT_TO_LIST', seat
    }
}

export const deleteSeatFromList = (seat: Object) => {
    return {
        type: 'DELETE_SEAT_FROM_LIST', seat
    }
}

export const deleteAllSeatFromList = () => {
    return {
        type: 'DELETE_ALL_SEAT_FROM_LIST'
    }
}

type confirmParamsType = {
    channel: string,
    seatNo: Array<string>,
    filmId: string,
    cinemaId: string,
    showId: string,
    showDate: string,
    count: number,
    moviePhoto: string,
    total: number,
    userId: string,
    customerId: string,
    customerUserId: string
}

export const saveConfirmParams = (confirmParams: confirmParamsType) => {
    return {
        type: 'SAVE_CONFIRM_PARAMS', confirmParams
    }
}

export const inputPhone = (phone: string) => {
    return {
        type: 'INPUT_PHONE', phone
    }
}

type confirmOrderType = {
    channel: string,
    seatNo: Array<string>,
    filmId: string,
    cinemaId: string,
    showId: string,
    showDate: string,
    count: number,
    moviePhoto: string,
    total: number,
    userId: string,
    customerId: string,
    customerUserId: string
}

export const confirmOrder = (confirmOrder: confirmOrderType, phone: string) => dispatch => {
    request.post(`${window.$config.HOST}/dianying/v1/order`, {
        channel: confirmOrder.channel,
        // seatNo: ['602083', '602084'],
        seatNo: confirmOrder.seatNo[0].id, //.map((ele, idx) => `${ele.seatRow}:${ele.seatCol}`),
        filmId: confirmOrder.filmId,
        cinemaId: confirmOrder.cinemaId,
        showId: confirmOrder.showId,
        showDate: confirmOrder.showDate,
        count: confirmOrder.count,
        moviePhoto: confirmOrder.moviePhoto,
        userId: confirmOrder.userId,
        customerId: confirmOrder.customerId,
        customerUserId : confirmOrder.customerUserId,
        phone: phone
    }).set('Authorization', 'f225a9a9e46dd2b4602fd466adb7054e')
    .set('ID', 'blm001')
    .end((err, res) => {
        if (!err && res.statusCode === 200) {
            if (res.body.code !== 0) return alert(JSON.stringify(res.body.message))
            browserHistory.push(`/cashier/${res.body.data.id}`)
            // dispatch(confirmOrderReturn(res.body.data))
            // dispatch(getCharge(res.body.data))
        } else {
            alert('网络状况不好')
        }
    })
}
