import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getMember} from '../actions';
import {Modal, Icon} from '@boluome/blm-web-components';
import localStyle from './addMember.css';
import Header from '../components/Header';
import { browserHistory } from 'react-router';

class AddMember extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            memberList: JSON.parse(localStorage.getItem('memberList')),
            chose: []
        }
    }
    render() {
        return (
            <div className={localStyle.addMemberWrapper}>
                <Header title='选择乘客' />
                <a onClick={() => this.confirmBtn()} className={localStyle.confirmBtn}>确定</a>
                <a className={localStyle.add} onClick={() => browserHistory.push(`/jipiao/memberForm`)}>
                    <Icon type='add_circle' />
                    <span>新增乘客</span>
                    <Icon type='keyboard_arrow_right' />
                </a>
                <div>
                    {this.state.memberList ? this.state.memberList.map((val, idx) => (
                        <div key={idx} onClick ={() => this.choseMember(idx)} className={localStyle.passengerInfo} style={false ? {left: '-1.5rem'} : null}>
                            {this.state.chose.indexOf(idx) > -1 ? <Icon type='check_circle' /> : <i className={localStyle.circle}></i>}
                            <div>
                                <span>{val.name}</span>
                                <span>{val.phoneNumber}</span>
                                <span>{val.type}票</span>
                            </div>
                            <div>
                                <span>{val.documentType}</span>
                                <span>{val.documentNumber}</span>
                            </div>
                            <a onClick={() => this.changeNowMember(idx)} className={localStyle.goAddmember}><Icon type='create'/></a>
                        </div>
                    )) : ''}
                </div>
            </div>
        )
    }
    confirmBtn() {
        const {getMember} = this.props;
        getMember(this.state.chose);
        browserHistory.goBack();
    }
    changeNowMember(idx) {
        // const {editNowMember} = this.props;
        // editNowMember(val, idx);
        browserHistory.push(`/jipiao/memberForm?index=${idx}`);
    }
    choseMember(idx) {
        if (this.state.chose.indexOf(idx) < 0) {
            let newChose = this.state.chose;
            newChose.push(idx);
            this.setState({
                chose: newChose
            });
        } else {
            let newChose = this.state.chose;
            newChose.splice(this.state.chose.indexOf(idx), 1);
            this.setState({
                chose: newChose
            });
        }
    }
}
const mapPropsToState = (state) => {
    return {
    }
};
const dispatchToProps = (dispatch) => {
    return {
        // editNowMember: (val, idx) => dispatch(editNowMember(val, idx))
        getMember: (data) => dispatch(getMember(data)) 
    }
}
export default connect(mapPropsToState, dispatchToProps)(AddMember);