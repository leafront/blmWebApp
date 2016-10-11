import libs from 'libs';
const getDay = (val) => {
        switch(val.getDay()) {
        case 0:
            return '周日';
        case 1: 
            return '周一';
        case 2: 
            return '周二';
        case 3: 
            return '周三';
        case 4: 
            return '周四';
        case 5: 
            return '周五';
        case 6: 
            return '周六';
        };
    }
let nowDate = new Date();
let initialState = {
    channelCurrent: 0,
    loading: true,
    cityList: [],
    startCity: {
        city: '上海'
    },
    endCity: {
        city: '北京'
    },
    year: nowDate.getFullYear(),
    month: nowDate.getMonth(),
    day: nowDate.getDate(),
    week: getDay(nowDate),
    scheduleList: [],
    popOut: false,
    priceInfo: {},
    nowInfo: {},
}

const setState = (oldState, newState) => libs.clone(oldState, newState);

const home = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_CHANNEL_TAB':
            return setState(state, {channelCurrent: action.idx, loading: false});
        case 'GET_CITY_LIST': 
            return setState(state, {cityList: action.data, loading: false});
        case 'CHANGE_CITY_START':
            return setState(state, {startCity: action.cityName});
        case 'CHANGE_CITY_END':
            return setState(state, {endCity: action.cityName});
        case 'GET_AIRPORT_SCHEDULE':
            return setState(state, {scheduleList: action.data, loading: false});
        case 'GET_DATE':
            return setState(state, {year: action.year, month: action.month, day: action.day, week: action.week});
        case 'CHANGE_LOADING':
            return setState(state, {loading: action.bol});
        case 'CHANGE_SCHEDULE_LIST':
            return setState(state, {scheduleListLocal: action.data});
        case 'CHANGE_POP_OUT':
            return setState(state, {popOut: action.bol});
        case 'GET_FLIGHT_PRICE':
            return setState(state, {priceInfo: action.data, nowInfo: action.nowData, loading: false});
        case 'GET_INSURANCERETURN':
            return setState(state, {insurance: action.data, loading: false});
        case 'GET_MEMBER':
            return setState(state, {memberCount: action.data});
        // case 'CHANGE_NOW_MEMBER':
        //     return setState(state, {changeNowMember: {type: action.val, index: action.idx}, });
        // case 'CLEAR_NOW_MEMBER':
        //     return setState(state, {changeNowMember: {}});
        default:
            return state;
    }
}

export default home;