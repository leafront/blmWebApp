import React from 'react';
import localStyle from './styles.css';
import {Icon, Modal} from '@boluome/blm-web-components';

const Content = ({num, price, departureTax, fuelTax, insurance, allCount, getInsurance}) => {
    return (
        <div className={localStyle.settlePopOut}>
            <div>
                <h4>费用预估</h4>
                <h2><span>&yen;</span>{allCount}</h2>
                <div>
                    <span>成人票价</span>
                    <span>&yen;{price} x {num}份</span>
                </div>
                <div>
                    <span>燃油</span>
                    <span>&yen;{fuelTax} x {num}份</span>
                </div>
                <div>
                    <span>机建</span>
                    <span>&yen;{departureTax} x {num}份</span>
                </div>
                {
                    insurance.length > 0 ? insurance.map((val, idx) => getInsurance.map((bol, index) => {
                            if (idx === index && bol) {
                                return (
                                    <div key={idx}>
                                        <span>{val.name}</span>
                                        <span>&yen;{val.price} x {num}份</span>
                                    </div>
                                )
                            }
                    })) : ''
                }
            </div>
            <a className='modal-close'><Icon type='close' /></a>
        </div>
    )
}


const SettleAcount = ({num, price, departureTax, fuelTax, insurance, getInsurance}) => {

    

    let finalInsuranceCount =  getInsurance.map((o, index) => o ? insurance[index].price * num : 0).reduce((count, current) => (count += current) && count, 0);

    let allCount = parseFloat(price) * num + parseFloat(departureTax) * num + parseFloat(fuelTax) * num + finalInsuranceCount;
    return (
        <div className={localStyle.settleAcount}>
            <h4>&yen;{num === 0 ? '－－－' : allCount}</h4>
            {num !== 0 ? <a onClick={() => Modal('fullScreen', <Content num={num} price={price} departureTax={departureTax} fuelTax={fuelTax} insurance={insurance} allCount={allCount} getInsurance={getInsurance} />)}>费用明细</a> : ''}
            <button>立即预订</button>
        </div>
    )
} 
export default SettleAcount;