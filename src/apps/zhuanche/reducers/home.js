import libs from 'libs';
let initialState = {
    channelCurrent: 0,
    nearByCar: 'loading...',
    getService: {},
    getAllPrices: {},
    getOrder: {},
    getOrderDetail: {},
    loading: true,
    payData: null,
}

const setState = (oldState, newState) => libs.clone(oldState, newState);

const home = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_CHANNEL_TAB':
            return setState(state, {channelCurrent: action.idx, loading: false});
        case 'GET_NEAR_BY':
            return setState(state, {nearByCar: action.data, loading: false});
        case 'GET_SERVICE':
            return setState(state, {getService: action.data, loading: false});
        case 'GET_ALL_CAR_TYPE_PRICES':
            return setState(state, {getAllPrices: action.data, loading: false});
        case 'CREATE_ORDER':
            return setState(state, {getOrder: action.data, loading: false});
        case 'ORDER_DETAIL':
            return setState(state, {getOrderDetail: action.data, loading: false});
        case 'CHANGE_LOADING':
            return setState(state, {loading: action.bol});
        case 'CANEL_ORDER' :
            return setState(state, {cancelOrder: action.data, loading: false});
        case 'GET_SETTILEMEMT':
            return setState(state, {payData: action.data, loading: false});
        default:
            return state;
    }
}

export default home;