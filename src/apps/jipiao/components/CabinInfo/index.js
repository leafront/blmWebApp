import React from 'react';
import localStyle from './styles.css';
import {Icon} from '@boluome/blm-web-components';

const CabinInfo = ({cabin, nextpage, callBack, shareFlightNo}) => {
    if (cabin.length !== 0) {
        return (
            <div className={localStyle.warpper} style={shareFlightNo ? {height: 'calc(100% - 48px - 12.5rem)'} : {height: 'calc(100% - 48px - 10.5rem)'}}>
                {cabin.map((val, idx) => {
                    return(<div key={idx} className={localStyle.cabinInfoWarpper} onClick={(e) => callBack(e, val)}>
                        <div className={localStyle.left}>
                            <strong>{val.cabinRankDetail + val.cabinRank}</strong>
                            <p>改退签规则 &gt;</p>
                        </div>
                        <div className={localStyle.middle}>
                            <strong>&yen; {val.facePrice}</strong>
                            <span>{val.discount.toString().slice(0, 1) + '折'}</span>
                        </div>
                        <div className={localStyle.right}>
                            <button onClick={(e) => nextpage(e, val)}>预定</button>
                        </div>
                    </div>)
                })}
            </div>
        )
    } else {
        return (<div/>);
    }
} 
export default CabinInfo;