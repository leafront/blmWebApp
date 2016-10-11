import React from 'react';
import localStyle from './styles.css';
import classnames from 'classnames';
import { Icon } from '@boluome/blm-web-components';
import { browserHistory } from 'react-router';
const PayOrder = ({show, price, orderPrice, callBack, pay, orderAdress}) => {
        return (
                <div className={classnames(localStyle.warp, show ? localStyle.show : '')}>
                    <div className={localStyle.payContent}>
                        <div className={localStyle.header}>
                            <a onClick={() => callBack(false)}><Icon type='close' /></a>
                            <h4>支付车费</h4>
                        </div>
                        <ul className={localStyle.orderList}>
                            <li>订单明细：{orderAdress || ''}</li>
                            <li>订单金额：&yen;{orderPrice || 0}</li>
                            <li>优惠减免：&yen;{(parseFloat(orderPrice) - parseFloat(price)).toFixed() || 0}</li>
                            <li>应付金额：<span>&yen;{price || 0}</span></li>
                        </ul>
                        <div className={localStyle.extraService} onClick={() => console.log('去红包页面')}>
                            <span>红包</span>
                            <span>0个红包可用</span>
                        </div>
                        <button className={localStyle.submitBtn} onClick={() => pay()}>去付款</button>
                    </div>
                </div>
            )
}
export default PayOrder;