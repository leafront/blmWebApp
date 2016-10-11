import React, {Component} from 'react';
import {connect} from 'react-redux';
import {popOut, changeLoading, getFlightPrice} from '../actions';
import {Modal, Icon} from '@boluome/blm-web-components';
import localStyle from './airportDetail.css';
import Header from '../components/Header';
import AirportInfo from '../components/AirportInfo';
import ShareInfoText from '../components/ShareInfoText';
import CabinInfo from '../components/CabinInfo';
import AirportDetailPopOut from '../components/AirportDetailPopOut';
import { browserHistory } from 'react-router';


class AirportDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: JSON.parse(localStorage.getItem('detail'))
        }
        this.goNextBol = null;
    }
    componentWillMount() {
        const {changeLoading} = this.props;
        changeLoading(false);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.priceInfo !== this.props.priceInfo && this.goNextBol === 'BUTTON') {
            browserHistory.push(`/jipiao/order`);
        }
    }
    componentWillUnmount() {
        const {popOut} = this.props;
        popOut(false);
    }
    render() {
        const {popOut, popOutState, loading, priceInfo, nowInfo} = this.props;
        const info = this.state.detail;
        return (
            <div className={localStyle.warpper}>
                <Header title={info.airline + ' ' + info.flightNo + ' ' + (info.shareFlightNo ? '共享' : '')} styles={{backgroundColor: 'transparent', color: 'rgb(255, 255, 255)'}} />
                <AirportInfo info={info} />
                <ShareInfoText shareFlightNo={info.shareFlightNo || ''} realFlightNo={info.realFlightNo} airline={info.airline} />
                <CabinInfo shareFlightNo={info.shareFlightNo} cabin={info.cabinInfo} nextpage={(e, val) => this.reservations(e, val)} callBack={(e, val) => this.tipsShow(e, val)} />
                {popOutState ? <AirportDetailPopOut show={loading} info={nowInfo} priceInfo={priceInfo} nextpage={(e, val) => this.reservations(e, val)} popOut={() => popOut(false)} /> : ''}
                {loading ? <div style={{position: 'fixed', top: '0', left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)',alignItems: 'center', justifyContent: 'center', color: 'white', display: 'flex'}}>loading...</div> : ''}
            </div>
        )
    }
    reservations(e, val) {
        const {nowInfo, getFlightPrice, priceInfo} = this.props;
        this.goNextBol = e.target.tagName;
        if (val !== undefined) {
            getFlightPrice(val, this.state.detail);
            localStorage.setItem('priceRes', JSON.stringify(val));
        } else if (val === nowInfo) {
            localStorage.setItem('priceRes', JSON.stringify(nowInfo));
        } else if (e.target.tagName === 'BUTTON' && priceInfo !== undefined) {
            browserHistory.push(`/jipiao/order`);
        }
    }
    tipsShow(e, val) {
        const {popOut, getFlightPrice, nowInfo} = this.props;
        this.goNextBol = e.target.tagName;
        if (e.target.tagName !== 'BUTTON') {
            if (nowInfo !== val) {
                getFlightPrice(val, this.state.detail);
            }
            popOut(true);
        }
    }
}
const mapPropsToState = (state) => {
    return {
        popOutState: state.home.popOut,
        loading: state.home.loading,
        priceInfo: state.home.priceInfo,
        nowInfo: state.home.nowInfo,
    }
};
const dispatchToProps = (dispatch) => {
    return {
        popOut: (bol) => dispatch(popOut(bol)),
        changeLoading: (bol) => dispatch(changeLoading(bol)),
        getFlightPrice: (nowData, prevData) => dispatch(getFlightPrice(nowData, prevData))
    }
}
export default connect(mapPropsToState, dispatchToProps)(AirportDetail);