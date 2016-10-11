// @ flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getNearBy, getService, getAllCarTypePrices, createOrder, defaultLoading} from '../actions';
import {Modal} from '@boluome/blm-web-components';
import {SearchInput} from '../components/search';
import {CarType} from '../components/carType';
import {SearchComponent} from '../components/searchComponent';
import { browserHistory } from 'react-router';
import ZhuancheStart from '../../../images/zhuanche_start.png';
import ZhuancheEnd from '../../../images/zhuanche_end.png';
import ZhuancheTips from '../../../images/zhuanche_tips.png';

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initalLocate: '',
            initalLngLat: {},
            endLocate: '您要去哪儿',
            endLngLat: {},
            city: '',
            nowService: {},
            carType: 0,
            didiDynamicSign: '',
        }
    }
    componentWillMount() {
        const {defaultLoading} = this.props;
        defaultLoading();
    }
    componentWillReceiveProps(nextProps) {
        const {id} = this.props;
        if (nextProps.nearByCar !== this.props.nearByCar) {
            let label = document.querySelectorAll('.BMapLabel');
            label.forEach((text) => {
                if (text.innerText !== 'shadoww') {
                    text.innerText = '附近' + nextProps.nearByCar + '辆车';
                }
            });
        }
        if (nextProps.carService !== this.props.carService) {
            let name;
            switch(id) {
                case 0: 
                    name = nextProps.carService['didi'];
                    break;
                case 1:
                    name = nextProps.carService['yidao'];
                    break;
            }
            this.setState({
                nowService: name
            });
        }
        if (nextProps.getOrder !== this.props.getOrder) {
            let partnerId = nextProps.getOrder.id;
            switch (id) {
                case 0:
                    browserHistory.push(`/zhuanche/order/${partnerId}?channel=didi&id=${partnerId}`);
                    break;
                case 1:
                    browserHistory.push(`/zhuanche/order/${partnerId}?channel=yidao&id=${partnerId}`);
                    break;
            }
        }
    }
    componentDidMount() {
        const cThis = this;
        const map = this.getNewMap('PravateBMap') //实例化地图
        const point = new $config.BMap.Point(116.331398,39.897445); // 设置初始坐标点
	    map.centerAndZoom(point,11);
        let geolocation = new $config.BMap.Geolocation(); // 根据浏览器定位
        cThis.getCurrentPosition(geolocation, map); 
        let geolocationControl = new $config.BMap.GeolocationControl(); // 地图自定义控件 返回定位位置
        map.addControl(geolocationControl);
        geolocationControl.addEventListener("locationSuccess", function(e){
            map.setZoom(18);
            map.clearOverlays();
            cThis.getCurrentPosition(geolocation, map);
        });
    }
    componentDidUpdate(props, state) {
        if (state.endLocate !== this.state.endLocate || state.initalLocate !== this.state.initalLocate && this.state.endLocate !== '您要去哪儿') {
            this.prices();
        }
    }
    render() {
        const {getAllPrices, loading} = this.props;
        return (
            <div>
                <div id="PravateBMap" style={{width: '100%', height: '80%'}} ></div>
                <SearchComponent 
                    initalLocate={this.state.initalLocate}
                    initalClick={() => Modal('fullScreen', 
                        <SearchInput
                            callback = {(c) => {
                                this.setState({initalLocate: c.title});
                                this.theLocation(c);
                            }}
                            city = {this.state.city}
                        />
                    )}
                    endLocate={this.state.endLocate}
                    endClick={() => Modal('fullScreen',
                        <SearchInput
                            callback = {(c) => this.setState({endLocate: c.title,endLngLat: c.point})} 
                            city = {this.state.city}
                        />
                    )}
                    carType={<CarType service={this.state.nowService} callback={(c) =>this.setState({carType: c})} prices={getAllPrices} choseCarType={this.state.carType} sign={(c) => this.setState({didiDynamicSign: c.dynamicSign})} />}
                    createOrder={() => this.createOrder()}
                    />
                    {loading ? <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)',alignItems: 'center', justifyContent: 'center', color: 'white', display: 'flex'}}>loading...</div> : ''}
            </div>
        )
    }
    getNewMap(name) {
        return new $config.BMap.Map(name);
    }
    getCurrentPosition(geolocation, map) {
        const {id, getNearBy, nearByCar} = this.props;
        const cThis = this;
        geolocation.getCurrentPosition(function(r) {
            if(this.getStatus() == BMAP_STATUS_SUCCESS){
                let mk = new $config.BMap.Marker(r.point, {icon: new BMap.Icon(ZhuancheStart, new BMap.Size(23,30))});
                // 添加标记 可改标记图标
                let label = new $config.BMap.Label(nearByCar, {offset: new BMap.Size(-41, -45)});
                label.setStyle({
                    backgroundImage: `url(${ZhuancheTips})`,
                    width: '106px',
                    height: '51px',
                    backgroundColor: 'transparent',
                    border: 0,
                    textAlign: 'center',
                    paddingTop: '12px',
                    boxSizing: 'border-box',
                });
                map.addOverlay(mk);
                map.setZoom(18);
                map.panTo(r.point);
                mk.setLabel(label);
                cThis.getLocation(mk);
                map.addEventListener('onmoving', function(){
                    mk.setPosition(map.getCenter());
                    cThis.getLocation(mk);
                });
            }
            else {
                alert('failed'+this.getStatus());
            }
        },{enableHighAccuracy: true});
    }
    getLocation(mk) {
        let geoc = new $config.BMap.Geocoder(); // 地址逆解析
        let cThis = this;
        const {getService, getNearBy, id} = this.props;
        getNearBy(id, mk.point)
        geoc.getLocation(mk.getPosition(), function(rs){
            let city = rs.addressComponents.city;
            getService(city.substring(0, city.indexOf('市')));
            cThis.setState({
                initalLocate: rs.address,
                city: rs.addressComponents.city,
                initalLngLat: rs.point
            });
        });
    }
    theLocation(c) {
        const {id, getNearBy, nearByCar} = this.props;
        let cThis = this;
        let mk = new $config.BMap.Marker(c.point, {icon: new BMap.Icon(ZhuancheStart, new BMap.Size(23,30))});
        let map = this.getNewMap('PravateBMap');
        let label = new $config.BMap.Label(nearByCar, {offset: new BMap.Size(-41, -45)});
        label.setStyle({
            backgroundImage: `url(${ZhuancheTips})`,
            width: '106px',
            height: '51px',
            backgroundColor: 'transparent',
            border: 0,
            textAlign: 'center',
            paddingTop: '12px',
            boxSizing: 'border-box',
        });
        map.clearOverlays();
        map.centerAndZoom(c.point, 18);
        map.addOverlay(mk);
        mk.setLabel(label);
        map.addEventListener('onmoving', function(){
            mk.setPosition(map.getCenter());
            cThis.getLocation(mk);
        });
    }
    prices() {
        const {getAllCarTypePrices} = this.props;
        getAllCarTypePrices(this.state.nowService, this.state.initalLngLat, this.state.endLngLat);
    }
    createOrder() {
        const {createOrderDispatch, id, getOrder} = this.props;
        let p = {}
        // userid, phoneNumber does't exist, push to login page
        p = {
            service: this.state.nowService,
            initalLngLat: this.state.initalLngLat,
            endLngLat: this.state.endLngLat,
            initalLocate: this.state.initalLocate,
            endLocate: this.state.endLocate,
            carType: this.state.nowService.carType[this.state.carType],
            dynamicSign: this.state.didiDynamicSign,
        }
        switch (id) {
            case 0: 
                if (this.state.didiDynamicSign !== '') {
                    createOrderDispatch(p);
                }
                break;
            case 1:
                createOrderDispatch(p);
                break;
        }
        
    }
}
const mapPropsToState = (state) => {
    return {
        channelCurrent: state.home.channelCurrent,
        nearByCar: state.home.nearByCar,
        carService: state.home.getService,
        getAllPrices: state.home.getAllPrices,
        getOrder: state.home.getOrder,
        loading: state.home.loading,
    }
};
const dispatchToProps = (dispatch) => {
    return {
        getNearBy: (channel, point) => dispatch(getNearBy(channel, point)),
        getService: (city) => dispatch(getService(city)),
        getAllCarTypePrices: (carService, initCd, endCd) => dispatch(getAllCarTypePrices(carService, initCd, endCd)),
        createOrderDispatch: (data) => dispatch(createOrder(data)),
        defaultLoading: () => dispatch(defaultLoading()),
    }
}
export default connect(mapPropsToState, dispatchToProps)(Content);