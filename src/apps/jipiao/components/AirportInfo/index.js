import React from 'react';
import localStyle from './styles.css';
import {Icon} from '@boluome/blm-web-components';
const nowDay =  (info) => {
    let nowDate = new Date();
    nowDate.setFullYear(info.slice(0,4));
    nowDate.setMonth(info.slice(5,7) - 1);
    nowDate.setDate(info.slice(8,10));
    switch(nowDate.getDay()) {
        case 0:
            return '周日';
        case 1: 
            return '周一';
        case 2: 
            return '周二';
        case 3: 
            return '周三';
        case 4: 
            return '周四';
        case 5: 
            return '周五';
        case 6: 
            return '周六';
    };
}
const AirportInfo = ({info}) => {
    return (
        <div className={localStyle.airportWarpper}>
            <div className={localStyle.left}>
                <span>{JSON.parse(localStorage.getItem('startCity')).city || ''}</span>
                <strong>{info.fromDate.slice(11)}</strong>
                <span>{info.fromAirportName + (info.fromTower !== undefined ? info.fromTower : '')}</span>
            </div>
            <div className={localStyle.middle}>
                <Icon type='flight' />
                <span>{info.fromDate.slice(5, 7)}月{info.fromDate.slice(8, 10)}日 {nowDay(info.fromDate)} </span>
                <span>{info.planeModel}机型</span>
            </div>
            <div className={localStyle.right}>
                <span>{JSON.parse(localStorage.getItem('endCity')).city || ''}</span>
                <strong>{info.toDate.slice(11)}</strong>
                <span>{info.toAirportName + (info.toTower !== undefined ? info.toTower : '')}</span>
            </div>
        </div>
    )
} 
export default AirportInfo;