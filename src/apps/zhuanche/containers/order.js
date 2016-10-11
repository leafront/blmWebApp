import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Icon , Toast} from '@boluome/blm-web-components';
import { getOrderDetail, getCancelOrder, getSettlement } from '../actions';
import OrderHeader from '../components/OrderHeader';
import OrderStatus from '../components/OrderStatus';
import OrderBottom from '../components/OrderBottom';
import PayOrder from '../components/PayOrder';
import {browserHistory} from 'react-router';
import ZhuancheStart from '../../../images/zhuanche_start.png';
import ZhuancheEnd from '../../../images/zhuanche_end.png';

class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            distance: '',
            show: false,
        }
        this.del = null;
    }
    componentWillMount() {
        const {getOrderDetail, location} = this.props;
        getOrderDetail(location.query.id);
        this._timer(true);
    }
    componentWillUnmount() {
        this._timer(false);
    }
    componentWillReceiveProps(nextProps) {
        const {location, orderDetail} = this.props;
        if (nextProps.orderDetail.id !== this.props.orderDetail.id) {
            const {lat, lng, tlat, tlng} = nextProps.orderDetail;
            const map = new $config.BMap.Map('PravateBMap'); //实例化地图
            const point = new $config.BMap.Point(116.331398,39.897445); // 设置初始坐标点
            map.centerAndZoom(point, 15);
            let p1 = new $config.BMap.Point(lng, lat);
            let p2 = new $config.BMap.Point(tlng, tlat);
            let searchComplete = (result) => {
                if (driving.getStatus() != BMAP_STATUS_SUCCESS) {
                    return;
                }
                let plan = result.getPlan(0);
                this.setState({
                    distance: plan.getDistance(true)
                })
            }
            let markersSet = (pois) => {
                map.removeOverlay(pois[0].marker);
                map.removeOverlay(pois[1].marker);
            }
            let driving = new $config.BMap.DrivingRoute(map, {renderOptions: {map: map, autoViewport: true}, onSearchComplete: searchComplete, onMarkersSet: markersSet});
            driving.search(p1, p2);
            driving.setSearchCompleteCallback(() => {
                let mk1 = new $config.BMap.Marker(p1, {icon: new BMap.Icon(ZhuancheStart, new BMap.Size(23,30))});
                let mk2 = new $config.BMap.Marker(p2, {icon: new BMap.Icon(ZhuancheEnd, new BMap.Size(23,30))});
                map.addOverlay(mk1);
                map.addOverlay(mk2);
            })
        }
        if(nextProps.cancelOrder !== this.props.cancelOrder) {
            getOrderDetail(location.query.id);
            Toast('outline', '取消成功');
        }
        if (nextProps.payData !== this.props.payData) {
            browserHistory.push(`/cashier/${location.query.id}`);
        }
    }
    render() {
        const {order, orderDetail, location, loading} = this.props;
        const {displayStatus, bookingDate, address, toAddress, driver, price, orderPrice} = orderDetail;
        return (
            <div>
                <OrderHeader />
                <OrderStatus status={displayStatus} cancelCallBack={() => this._cancelOrder()} payCallBack={() => this._payOrderShow()} driver={driver}/>
                <div id="PravateBMap" style={{width: '100%', height: '40%'}}></div>
                <OrderBottom distance={this.state.distance} time={bookingDate} start={address} end={toAddress} channel={location.query.channel} />
                <PayOrder show={this.state.show} callBack={(val) => this.setState({show: val})} orderPrice={orderPrice} price={price} pay={() => this._payOrder() } orderAdress={address + '-' + toAddress} />
                {loading ? <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)',alignItems: 'center', justifyContent: 'center', color: 'white', display: 'flex'}}>loading...</div> : ''}
            </div>
        )
    }
    _timer(bol) {
        const {getOrderDetail, location, orderDetail} = this.props;
        const rotation = () => {
            getOrderDetail(location.query.id)
            return this.del = setTimeout(rotation, 5000);
        }
        if (bol) {
            rotation();
        } else {
            clearTimeout(this.del);
        }
    }
    _cancelOrder() {
        const {getOrderDetail, getCancelOrder, orderDetail} = this.props;
        const {partnerId, channel, id} = orderDetail;
        getCancelOrder(partnerId, channel, id);
    }
    _payOrderShow() {
        this.setState({show: true});
    }
    _payOrder() {
        const {getSettlement, orderDetail} = this.props;
        const {id} = orderDetail;
        getSettlement(id);
        this._timer(false);
    }
}
const mapPropsToState = (state) => {
    return {
        order: state.home.getOrder,
        orderDetail: state.home.getOrderDetail,
        cancelOrder: state.home.cancelOrder,
        loading: state.home.loading,
        payData: state.home.payData
    }
};
const dispatchToProps = (dispatch) => {
    return {
        getOrderDetail: (orderId) => dispatch(getOrderDetail(orderId)),
        getCancelOrder: (partnerId, channel, id) => dispatch(getCancelOrder(partnerId, channel, id)),
        getSettlement: (orderId, couponId, activityId) => dispatch(getSettlement(orderId, couponId, activityId)),
    }
}
export default connect(mapPropsToState, dispatchToProps)(Order);