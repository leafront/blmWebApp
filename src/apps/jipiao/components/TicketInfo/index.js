import React from 'react';
import localStyle from './styles.css';
import {Icon, Modal} from '@boluome/blm-web-components';

const TicketInfo = ({num, count, redpackge, discount}) => {
        console.log(count);
        return (
            <div className={localStyle.ticketInfo}>
                <p>真旅网出票</p>
                <div>
                    <h5>票数</h5>
                    <h6>{num}张</h6>
                    <span style={{color: 'black'}}>&yen; {count}</span>
                </div>
                <div>
                    <p>
                        <span>减</span>红包抵扣
                    </p>
                    <span>-&yen; {redpackge}</span>
                </div>
                <div>
                    <p>
                        <span className={localStyle.discount}>惠</span>活动优惠
                    </p>
                    <span>-&yen; {discount}</span>
                </div>
            </div>
        )
} 
export default TicketInfo;