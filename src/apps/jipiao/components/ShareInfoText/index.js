import React from 'react';
import localStyle from './styles.css';
import {Icon} from '@boluome/blm-web-components';

const ShareInfoText = ({shareFlightNo, realFlightNo, airline}) => {
    if(shareFlightNo) {
        return (
            <div className={localStyle.shareinfoTextWarpper}>
                <Icon type='error' />
                共享航班，实际乘坐 {airline + realFlightNo}
            </div>
        )
    } else {
        return (<div />);
    }
} 
export default ShareInfoText;