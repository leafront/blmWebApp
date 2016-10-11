// @flow
import request from 'superagent';
import {Toast} from '@boluome/blm-web-components';
export const changeChannelTab = (idx: number) => {
    return {
        type: 'CHANGE_CHANNEL_TAB', idx
    }
}
export const searchCityReq = () => dispatch => {
    dispatch(changeLoading(true));
    request.get(window.$config.HOST + '/jipiao/queryAirport')
        .end((err, res) => {
            if (!err && res.statusCode === 200) {
                if (res.body.code !== 0) {
                Toast('outline', '网络状况不佳，请稍后再试');
                return dispatch(changeLoading(false));
            };
                dispatch(getSearchCityReturn(res.body.data));
            } else {
                Toast('outline', '服务器故障');
                return dispatch(changeLoading(false));
            }
        });
}

const getSearchCityReturn = (data) => {
    return {
        type: 'GET_CITY_LIST', data
    }
}
export const changeCity = (cityName, state) => {
    switch (state) {
        case 'start':
            return {
                type: 'CHANGE_CITY_START', cityName
            }
        case 'end':
            return {
                type: 'CHANGE_CITY_END', cityName
            }
    }
}
export const getAirportSchedule = (fromCity, toCity, formDate) => dispatch => {
    dispatch(changeLoading(true));
    request.post(window.$config.HOST + '/jipiao/queryFlightSchedule')
        .send({fromCity: fromCity.code, toCity: toCity.code, fromDate: formDate})
        .end((err, res) => {
            if (!err && res.statusCode === 200) {
                switch (res.body.code) {
                    case 4:
                        Toast('outline', res.body.message);
                        return dispatch(changeLoading(false));
                }
                dispatch(getAirportScheduleReturn(res.body.data));
            }
        })   
}

const getAirportScheduleReturn = (data) => {
    return {
        type: 'GET_AIRPORT_SCHEDULE', data
    }
}

export const getDate = (year, month, day, week) => {
    return {
        type: 'GET_DATE', year, month, day, week
    }
}

export const changeScheduleList = (data) => {
    return {
        type: 'CHANGE_SCHEDULE_LIST', data
    }
}

export const popOut = (bol) => {
    return {
        type: 'CHANGE_POP_OUT', bol
    }
}
export const getFlightPrice = (nowData, prevData) => dispatch => {
    dispatch(changeLoading(true));
    let sendData = {
        flightNo: prevData.flightNo,
        cabinRank: nowData.cabinRank,
        cabinCode: nowData.cabinCode,
        fromDate: prevData.fromDate,
        toDate: prevData.toDate,
        fromAirport: prevData.fromAirport,
        toAirport: prevData.toAirport,
        shareFlightNo: prevData.realFlightNo,
        subCabinCode: nowData.subCabinCode,
    }
    request.post(window.$config.HOST + '/jipiao/queryFlightPrice')
        .send(sendData)
        .end((err, res) => {
            if (!err && res.statusCode === 200) {
                if (res.body.code !== 0) {
                    Toast('outline', res.body.message);
                    dispatch(popOut(false));
                    return dispatch(changeLoading(false));
                }
                dispatch(getFlightPriceReturn(res.body.data, nowData));
            }
        })
}

const getFlightPriceReturn = (data, nowData) => {
    return {
        type: 'GET_FLIGHT_PRICE', data, nowData
    }
}

export const getInsurance = () => dispatch => {
    dispatch(changeLoading(true));
    request.get(window.$config.HOST + '/jipiao/queryInsurance')
        .end((err, res) => {
            if (!err && res.statusCode === 200) {
                if (res.body.code !== 0) {
                Toast('outline', '网络状况不佳，请稍后再试');
                return dispatch(changeLoading(false));
            };
                dispatch(getInsuranceReturn(res.body.data));
            } else {
                Toast('outline', '服务器故障');
                return dispatch(changeLoading(false));
            }
        });
}

const getInsuranceReturn = (data) => {
    return {
        type: 'GET_INSURANCERETURN', data
    }
}

export const getMember = (data) => {
    return {
        type: 'GET_MEMBER', data
    }
}
// export const editNowMember = (val, idx) => {
//     return {
//         type: 'CHANGE_NOW_MEMBER', val, idx
//     }
// }
// export const clearNowMember = () => {
//     return {
//         type: 'CLEAR_NOW_MEMBER'
//     }
// }

export const changeLoading = (bol) => {
    return {
        type: 'CHANGE_LOADING', bol
    }
}