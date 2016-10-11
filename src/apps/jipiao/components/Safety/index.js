import React from 'react';
import localStyle from './styles.css';
import {Icon, Modal} from '@boluome/blm-web-components';
import classnames from 'classnames';

const Content = ({detail}) => {
    return (
        <div className={localStyle.detailWarpper}>
            <h3>{detail.name}</h3>
            <div>
                {detail.detail.map((val, idx) => <p key={idx}>{val}</p>)}
            </div>
            <a className='modal-close'><Icon type='close' /></a>
        </div>
    )
}

const Safety = ({insurance, num, getInsurance, isActive}) => {
    if (insurance) {
        return (
            <div>
                {insurance.map((val, idx) => 
                    (
                        <div key={idx} className={localStyle.safety}>
                            <Icon type='flight_takeoff' />
                            <div className={localStyle.safetyMiddle}>
                                <div>
                                    <h4>{val.name}</h4>
                                    <a onClick={() => Modal('fullscreen', <Content detail={val} />)}><Icon type='error' /></a>
                                    <p>&yen; {val.price}/ 人 x {num}</p>
                                </div>
                                <p>{val.brief}</p>
                            </div>
                            <a className={classnames(localStyle.toggle, isActive[idx] ? localStyle.active : '')} onClick={() => getInsurance(idx)}>
                                <i className={isActive[idx] ? localStyle.active : ''} />
                            </a>
                        </div>
                    )
                )}
            </div>
        )
    } else {
        return <div/>
    }
} 
export default Safety;