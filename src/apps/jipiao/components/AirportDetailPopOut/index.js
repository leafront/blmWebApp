import React from 'react';
import localStyle from './styles.css';
import {Icon} from '@boluome/blm-web-components';

const AirportDetailPopOut = ({nextpage, popOut, priceInfo, info, show}) => {
    if (!show && priceInfo.aduPriceInfo !== undefined) {
        return (
            <div className={localStyle.popOutWarpper} onClick={(e) => e.target.className.indexOf('shadow') > -1 ? popOut() : ''}>
                <div>
                    <div className={localStyle.popOutTitle}>
                        <a onClick={() => popOut()}><Icon type='close' /></a>
                        <h4>购票说明</h4>
                    </div>
                    <div className={localStyle.popOutContent}>
                        <div>
                            <h5>{(info.cabinRankDetail)}{info.discount < 100 ? info.discount.toString().slice(0, 1) + '折' : ''}</h5>
                            <p>机建<span> &yen;{priceInfo.aduPriceInfo.departureTax || 0}</span> / 燃油<span> &yen;{priceInfo.aduPriceInfo.fuelTax || 0}</span></p>
                            <span>&yen;{priceInfo.aduPriceInfo.settlement}</span>
                        </div>
                        <div>
                            <h5>改签说明</h5>
                            <p>{priceInfo.aduPriceInfo.endorseAndRefundRule.ticketChangeRemark}</p>
                        </div>
                        <div>
                            <h5>退票说明</h5>
                            <p>{priceInfo.aduPriceInfo.endorseAndRefundRule.ticketBounceRemark}</p>
                        </div>
                        <div>
                            <h5>签转说明</h5>
                            <p>{priceInfo.aduPriceInfo.endorseAndRefundRule.ticketSignChangeRemark}</p>
                        </div>
                        <div>
                            <h5>废票备注</h5>
                            <p>{priceInfo.aduPriceInfo.endorseAndRefundRule.ticketCancelRemark}</p>
                        </div>
                    </div>
                    <div className={localStyle.popOutFooter}>
                        <span>&yen;{parseFloat(priceInfo.aduPriceInfo.settlement) + parseFloat(priceInfo.aduPriceInfo.departureTax) + parseFloat(priceInfo.aduPriceInfo.fuelTax)}</span>
                        <button onClick={(e) => nextpage(e)}>立即预订</button>
                    </div>
                </div>
                <div className={localStyle.shadow}></div>
            </div>
        )
    } else {
        return (<div/>);
    }
} 
export default AirportDetailPopOut;