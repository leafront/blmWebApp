import React from 'react';
import localStyle from './styles.css';
import {Icon} from '@boluome/blm-web-components';

const OrderPopText = ({popOut}) => {
    return (
        <a className={localStyle.popText} onClick={() => popOut()}>
            <Icon type='error' />
            <span>取票 / 退票 / 改签说明</span>
        </a>
    )
} 
export default OrderPopText;