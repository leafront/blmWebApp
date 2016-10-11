// @flow
import request from 'superagent';
import {Toast} from '@boluome/blm-web-components';
import {browserHistory} from 'react-router';
export const changeChannelTab = (idx: number) => {
    return {
        type: 'CHANGE_CHANNEL_TAB', idx
    }
}
export const getNearBy = (channel, point) => (dispatch) => {
    let channelName;
    switch (channel) {
        case 0: 
        channelName = 'didi';
        break;
        case 1:
        channelName = 'yidao';
        default:
    }
    dispatch(changeLoading(true));
    request.post(window.$config.HOST + '/zhuanche/v1/nearby')
        .send({channel: channelName, latitude: point.lat, longitude: point.lng})
        .end((err, res) => {
            if (!err && res.statusCode === 200) {
                if (res.body.code !== 0) {
                    Toast('outline', '网络状况不佳，请稍后再试');
                    return dispatch(changeLoading(false));
                };
                dispatch(getNearByReturn(res.body.data));
            }
        })     
}

const getNearByReturn = (data) => {
    return {
        type: 'GET_NEAR_BY', data
    }
}


export const getService = (city) => (dispatch) => {
    dispatch(changeLoading(true));
    request.get(window.$config.HOST + '/zhuanche/v1/service?city=' + city).end((err, res) => {
        if (!err && res.statusCode === 200) {
            if (res.body.code !== 0) {
                Toast('outline', '网络状况不佳，请稍后再试');
                return dispatch(changeLoading(false));
            };
            dispatch(getServiceReturn(res.body.data));
        }
    });
} 
const getServiceReturn = (data) => {
    return {
        type: 'GET_SERVICE', data
    }
}


export const getAllCarTypePrices = (carService, initCd, endCd) => (dispatch) => {
    dispatch(changeLoading(true));
    let req = {};
    let carType = [];
    carService.carType.forEach((val) => carType.push(val.id));
    switch (carService.channel) {
        case 'didi':
            req = {
                didi: carType,
                cityId: carService.cityId,
            }
            break;
        case 'yidao':
            req = {
                yidao: carType,
                short: carService.short,
            }
            break;
        default: 
    }
    request.post(window.$config.HOST + '/zhuanche/v1/estimate/prices')
        .send({latitude: initCd.lat, longitude: initCd.lng, tlatitude: endCd.lat, tlongitude: endCd.lng,})
        .send(req)
        .end((err, res) => {
            if (!err && res.statusCode === 200) {
                if (res.body.code !== 0) {
                    Toast('outline', '网络状况不佳，请稍后再试');
                    return dispatch(changeLoading(false));
                };
                dispatch(getAllCarTypePricesReturn(res.body.data));
            }
        });
}
const getAllCarTypePricesReturn = (data) => {
    return {
        type: 'GET_ALL_CAR_TYPE_PRICES', data
    }
}


export const createOrder = (data) => (dispatch) => {
    dispatch(changeLoading(true));
    let req;
    switch (data.service.channel) {
        case 'didi':
            req = {cityId: data.service.cityId, dynamicSign: data.dynamicSign}
            break;
        case 'yidao':
            req = {shortPinyin: data.service.shortPinyin}
    }
    // if  isBooking: 1  , add  date: '2016-09-07 16:40:00'
    request.post(window.$config.HOST + '/zhuanche/v1/order')
        .send({
            channel: data.service.channel,
            address: data.initalLocate,
            toAddress: data.endLocate,
            latitude: data.initalLngLat.lat,
            longitude: data.initalLngLat.lng,
            tlatitude: data.endLngLat.lat,
            tlongitude: data.endLngLat.lng,
            carTypeId: data.carType.id,
            phone: '18516011992',
            name: 'Jackie',
            userId: 'blm_jk6w4yw',
            isBooking: 0,
            customerUserId: 'blm_test_user'
        })
        .send(req)
        .end((err, res) => {
            if (!err && res.statusCode === 200) {
                if (res.body.code !== 0) {
                    Toast('outline', '网络状况不佳，请稍后再试');
                    return dispatch(changeLoading(false));
                };
                dispatch(createOrderReturn(res.body.data));
            }
        })
}

const createOrderReturn = (data) => {
    return {
        type: 'CREATE_ORDER', data
    }
}

export const getOrderDetail = (orderId) => (dispatch) => {
    request.get(window.$config.HOST + '/order/v1/zhuanche/' + orderId + '/info')
    .set({'Cache-control': 'no-cache'})
    .end((err, res) => {
        if (!err && res.statusCode === 200) {
            if (res.body.code !== 0) {
                Toast('outline', '网络状况不佳，请稍后再试');
                return browserHistory.goBack();
            };
            dispatch(getOrderDetailRetrun(res.body.data));
        }
    });
}

const getOrderDetailRetrun = (data) => {
    return {
        type: 'ORDER_DETAIL', data
    }
}

export const getCancelOrder = (partnerId, channel, id) => (dispatch) => {
    dispatch(changeLoading(true));
    request.post(window.$config.HOST + '/order/v1/cancel')
        .send({channel: channel, partnerId: partnerId, orderType: 'zhuanche', id: id})
        .end((err, res) => {
            if (!err && res.statusCode === 200) {
                if (res.body.code !== 0) {
                Toast('outline', '取消失败');
                return dispatch(changeLoading(false));
            };
                dispatch(getCancelOrderReturn(res.body.code));
            }
        });
}

const getCancelOrderReturn = (data) => {
    return {
        type: 'CANEL_ORDER', data
    }
}
export const getSettlement = (orderId, couponId, activityId) => dispatch => {
    dispatch(changeLoading(true));
    let obj = {};
    if (couponId !== undefined || activityId !== undefined) {
        obj = {
            couponId: couponId,
            activityId: activityId
        }
    }
    request.post(window.$config.HOST + '/zhuanche/v1/settlement')
        .send({orderId: orderId})
        .send(obj)
        .end((err, res) => {
            if (!err && res.statusCode === 200) {
                if (res.body.code !== 0) {
                Toast('outline', '网络状况不佳，请稍后再试');
                return dispatch(changeLoading(false));
            };
                dispatch(getSettlementReturn(res.body.code));
            }
        })
} 
const getSettlementReturn = (data) => {
    return {
        type: 'GET_SETTILEMEMT', data
    }
}

export const defaultLoading = () => dispatch => {
    return dispatch(changeLoading(true));
}
const changeLoading = (bol) => {
    return {
        type: 'CHANGE_LOADING', bol
    }
}