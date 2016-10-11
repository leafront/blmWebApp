import React, {Component} from 'react';
import {connect} from 'react-redux';
import {popOut, changeLoading, getFlightPrice, getInsurance} from '../actions';
import {Modal, Icon} from '@boluome/blm-web-components';
import localStyle from './order.css';
import Header from '../components/Header';
import AirportInfo from '../components/AirportInfo';
import OrderPopText from '../components/OrderPopText';
import OrderPopOut from '../components/OrderPopOut';
import Safety from '../components/Safety';
import TicketInfo from '../components/TicketInfo';
import SettleAcount from '../components/SettleAcount';
import AddMember from '../components/AddMember';
import { browserHistory } from 'react-router';

class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: JSON.parse(localStorage.getItem('detail')),
            info: JSON.parse(localStorage.getItem('priceRes')),
            getInsurance: [false, false, false],
        }
    }
    componentWillMount() {
        const {changeLoading, getFlightPrice, priceInfo, getInsurance} = this.props;
        if (priceInfo.aduPriceInfo === undefined) {
            getFlightPrice(this.state.info, this.state.detail);
        }
        getInsurance();
    }
    render() {
        const {loading, popOutState, priceInfo, popOut, nowInfo, insurance, memberCount} = this.props;
        const info = this.state.detail;
        // let getAduPriceInfo = priceInfo.aduPriceInfo ? priceInfo.aduPriceInfo : null;
        // let getChdPriceInfo = priceInfo.chdPriceInfo ? priceInfo.chdPriceInfo : null;
        // let getInfPriceInfo = priceInfo.infPriceInfo ? priceInfo.infPriceInfo : null;
        console.log(priceInfo, memberCount);
        let getAllPrice = Object.keys(priceInfo).length > 0 ? priceInfo : 0;
        return (
            <div className={localStyle.warpper}>
                <Header title={info.airline + ' ' + info.flightNo + ' ' + (info.shareFlightNo ? '共享' : '')} styles={{backgroundColor: 'transparent', color: 'rgb(255, 255, 255)'}} />
                <AirportInfo info={info} />
                <OrderPopText popOut = {() => popOut(true)} />
                <AddMember toAddMemebr={() => browserHistory.push(`/jipiao/addMember`)} delbtn={() => this.delDom()} showMember={memberCount} />
                <div className={localStyle.contact}>
                    <label>手机号<input placeholder='请输入联系人手机' type='tel' ref='contact-number' /></label>
                    <label>联系人<input placeholder='请输入联系人姓名' ref='contact-name' /></label>
                </div>
                <Safety insurance={insurance} num={memberCount ? memberCount.length : 0} getInsurance={(idx) => this.insuranceChange(idx)} isActive={this.state.getInsurance} />
                <a className={localStyle.activity} onClick={() => console.log('跳转红包页面')}>红包 <span>无红包可用<Icon type='keyboard_arrow_right' /></span></a>
                <TicketInfo num={memberCount ? memberCount.length : 0} count={getAllPrice} redpackge={0} discount={0} />
                <SettleAcount 
                    num={memberCount ? memberCount.length : 0}
                    price={getAllPrice}
                    getInsurance={this.state.getInsurance}
                    insurance={insurance}
                    />
                {popOutState ? <OrderPopOut show={loading} info={nowInfo} priceInfo={priceInfo} popOut={() => popOut(false)} /> : ''}
                {loading ? <div style={{position: 'fixed', top: '0', left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)',alignItems: 'center', justifyContent: 'center', color: 'white', display: 'flex'}}>loading...</div> : ''}
            </div>
        )
    }
    delDom() {
        console.log('clear');
    }
    insuranceChange(idx) {
        let insuranceArray = this.state.getInsurance;
        let newArray = [];
        insuranceArray.map((val, index) => {
            if (index === idx) {
                val = !val;
            }
            newArray.push(val);
        });
        this.setState({getInsurance: newArray});
    }
}

const mapPropsToState = (state) => {
    return {
        popOutState: state.home.popOut,
        loading: state.home.loading,
        priceInfo: state.home.priceInfo,
        nowInfo: state.home.nowInfo,
        insurance: state.home.insurance,
        memberCount: state.home.memberCount
    }
};
const mapDispatchToProps = (dispatch, state) => {
    return {
        popOut: (bol) => dispatch(popOut(bol)),
        changeLoading: (bol) => dispatch(changeLoading(bol)),
        getFlightPrice: (nowData, prevData) => dispatch(getFlightPrice(nowData, prevData)),
        getInsurance: () => dispatch(getInsurance())
    }
}

export default connect(mapPropsToState, mapDispatchToProps)(Order);