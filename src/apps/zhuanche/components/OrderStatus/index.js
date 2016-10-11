// @flow
import React from 'react'
import localStyle from './styles.css'
import classnames from 'classnames'
import { Icon } from '@boluome/blm-web-components'

const DriverInfo = (props) => {
    if (props.driver) {
        const driver = props.driver;
        let starList = [];
        for (let i = 0; i < driver.level; i++) {
            starList.push(i);
        }
        return (
            <div className={localStyle.driverDiv}>
                <img className={localStyle.driverAvatar} src={driver.avatar} />
                <div className={localStyle.driverInfo}>
                    <p>{driver.name} &nbsp;&nbsp;&nbsp;{driver.card}</p>
                    <p>{driver.car_type} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {starList.map((idx) => <Icon key={idx} type='star' />)}</p>
                </div>
                <div className={localStyle.driverPhone}>
                    <a href={"tel:" + driver.phone}><Icon type = 'phone' size = { 20 } /></a>
                </div>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}
const OrderStatus = (props) => {
    const status = props.status;
    let cancel, statusText, color = '#D6D6D7', pay = false;
    switch (status) {
        case '等待司机接单':
            cancel = true;
            statusText = '请稍等片刻';
            color = '#FF9A01';
            break;
        case '司机已接单':
            cancel = true;
            statusText = '司机正向你飞奔而来';
            color = '#FF6666';
            break;
        case '司机已就位':
            cancel = false;
            statusText = '';
            color = '#FF6666';
            break;
        case '行驶中':
            cancel = false;
            statusText = '请注意安全';
            color = '#FF6666';
            break;
        case '待支付':
            cancel = false;
            statusText = '';
            pay = true;
            color = '#FF6666';
            break;
        default:
            cancel = false;
            statusText = '';
            pay = false;
            color = '#D6D6D7';
            break;
    }
    return (
        <div className={localStyle.status}>
            <DriverInfo driver={props.driver} />
            <div className={localStyle.titleStatus}>
                <span className={classnames(localStyle.circle)} style={{backgroundColor: color, borderColor: color}} />
                <p className={localStyle.statusText}>{props.status} <span>{statusText}</span></p>
                {cancel ? <a className={localStyle.statusA} onClick={() => props.cancelCallBack()}>取消订单</a> : ''}
                {pay ? <a className={localStyle.statusA} onClick={() => props.payCallBack()}>立即付款</a> : ''}
            </div>
            <p className={localStyle.tipsText}>
                提示:若司机提醒您没有余额，请让司机进行下一步操作，这时会弹出菠萝觅在线支付页面
            </p>
        </div>
    )
}

export default OrderStatus
