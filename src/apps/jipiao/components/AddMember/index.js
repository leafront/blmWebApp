import React, {Component} from 'react';
import localStyle from './styles.css';
import {Icon, Modal} from '@boluome/blm-web-components';
const Member = ({delbtn, callback, content}) => {
    const member = JSON.parse(localStorage.getItem('memberList'))[content];
    return (
        <div className={localStyle.passengerInfo} style={false ? {left: '-1.5rem'} : null}>
            <a><Icon type='do_not_disturb_on' /></a>
            <div>
                <span>{member.name}</span>
                <span>{member.phoneNumber}</span>
                <span>{member.type}票</span>
            </div>
            <div>
                <span>{member.documentType}</span>
                <span>{member.documentNumber}</span>
            </div>
            <a onClick={() => delbtn()}>删除</a>
        </div>
    )
}
const AddMember = ({toAddMemebr, delbtn, callback, showMember}) => {
    return (
        <div>
            {showMember ? showMember.map((val, idx) => <Member key={idx} content={val} delbtn={delbtn} callback={callback} />) : ''}
            <a className={localStyle.addPassenger} onClick={() => toAddMemebr()}>添加乘客</a>
        </div>
    )
}

export default AddMember;