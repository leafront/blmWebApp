import React, {Component} from 'react';
import {connect} from 'react-redux';
import {} from '../actions';
import {Modal, Icon, Toast} from '@boluome/blm-web-components';
import localStyle from './memberForm.css';
import Header from '../components/Header';
import { browserHistory } from 'react-router';

const Identified = ({callback}) => {
    let id = ['身份证'] // '护照', '港澳通行证', '台胞证'
    return (
        <div className={localStyle.select}>
            <h4>选择身份类型</h4>
            {id.map((val, idx) => <a onClick={() => callback(val)} key={idx}>{val}</a>)}
        </div>
    )
}
class MemberForm extends React.Component {
    constructor(props) {
        super(props);
        //let d = new Date();
        //d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate()
        this.state = {
            id: '身份证',
            born: '输入正确身份证号自动校验',
            type: '输入正确身份证号自动校验',
            correct: false
        }
    }
    componentDidMount() {
        // const {changeNowMember} = this.props;
        // console.log(changeNowMember);
        const {location} = this.props;
        // if (changeNowMember !== undefined && changeNowMember.type !== undefined) {
            let propsInfo = JSON.parse(localStorage.getItem('memberList'));
            if (propsInfo !== undefined && location.query.index !== undefined) {
                let newObj = propsInfo[location.query.index];
                this.refs.name.value = newObj.name;
                this.refs.phoneNumber.value = newObj.phoneNumber;
                this.refs.documentNumber.value = newObj.documentNumber;
                this.setState({
                    id: newObj.documentType,
                    born: newObj.born,
                    type: newObj.type,
                    correct: true
                });
            }
        // }
    }
    // componentWillUnmount() {
    //     const {clearNowMember} = this.props;
    //     clearNowMember();
    // }
    render() {
        return (
            <div className={localStyle.addMemberWrapper}>
                <Header title='编辑乘客' />
                <a onClick={() => this.confirmBtn()} className={localStyle.confirmBtn}>确定</a>
                <from>
                    <div>
                        <span>姓名</span>
                        <input type='text'  ref='name' />
                    </div>
                    <div>
                        <span>手机号</span>
                        <input type='text'  ref='phoneNumber' />
                    </div>
                    <div>
                        <span>证件类型</span>
                        <a onClick={() => Modal('confirm', <Identified callback={(val) => this.setState({id: val})} />)}>{this.state.id}</a>
                        <Icon type='keyboard_arrow_right' />
                    </div>
                    <div>
                        <span>证件号码</span>
                        <input type='text'  ref='documentNumber' onKeyUp = {() => this.verification(this.refs.documentNumber.value)} />
                    </div>
                    <div>
                        <span>出生年月</span>
                        {this.state.born}
                    </div>
                    <div>
                        <span>类型</span>
                        {this.state.type}
                    </div>
                </from>
            </div>
        )
    }
    IdentityCodeValid(code) {
        let val = code;
        let date = new Date();
        let city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
        let tip = "";
        let pass= true;
        if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
            // tip = "身份证号格式错误";
            pass = false;
        }
        
        else if(!city[code.substr(0,2)]){
            // tip = "地址编码错误";
            pass = false;
        }
        else{
            if(code.length == 18){
                code = code.split('');
                let factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
                let parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
                let sum = 0;
                let ai = 0;
                let wi = 0;
                for (let i = 0; i < 17; i++)
                {
                    ai = code[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                let last = parity[sum % 11];
                if(parity[sum % 11] != code[17]){
                    // tip = "校验位错误";
                    pass =false;
                }
            }
        }
        if(!pass) {
            this.setState({
                born: '输入正确身份证号自动校验',
                type: '输入正确身份证号自动校验',
                correct: false,
            })
            return Toast('error', '请输入正确的身份证号码')
        };
        Toast('success', '验证成功');
        let oldVerification = date.getFullYear() - val.slice(6, 10), type;
        if ( 2 <= oldVerification && oldVerification <= 12) {
            type = '儿童';
        } else if (0 <= oldVerification && oldVerification < 2) {
            type = '婴儿';
        } else {
            type = '成人';
        }
        this.setState({
            born: val.slice(6, 10) + '-' + val.slice(10, 12) + '-' + val.slice(12, 14),
            type: type, 
            correct: true,
        });
        return pass;
    }

    verification(val) {
        if (val.length === 18) {
            this.IdentityCodeValid(val);
        }
    }
    confirmBtn() {
        const {location} = this.props;
        let type = this.state.type, 
            name = this.refs.name.value,
            phoneNumber = this.refs.phoneNumber.value,
            documentType = this.state.id,
            documentNumber = this.refs.documentNumber.value,
            born = this.state.born;
        if (name.length < 1 || name.length > 10) {
            Toast('error', '请输入合法的姓名');
            return this.refs.name.focus();;
        } else if (phoneNumber.length !== 11) {
            Toast('error', '请输入正确的手机号');
            return this.refs.phoneNumber.focus();
        } else if (!this.state.correct) {
            Toast('error', '请输入正确的身份证号码');
            return this.refs.documentNumber.focus();
        }
        let userMember = {
            type: type,
            name: name,
            phoneNumber: phoneNumber,
            documentType: documentType,
            documentNumber: documentNumber,
            born: born,
        }
        let oldArray = JSON.parse(localStorage.getItem('memberList'));
        if (oldArray === null) {
            let array = [];
            array.push(userMember);
            localStorage.setItem('memberList', JSON.stringify(array));
        } else {
            if (location.query.index !== undefined) {
                oldArray[location.query.index] = userMember;
                localStorage.setItem('memberList', JSON.stringify(oldArray));
                return browserHistory.goBack();
            }
            let newArray = oldArray;
            newArray.push(userMember);
            localStorage.setItem('memberList', JSON.stringify(newArray));
        }
        return browserHistory.goBack();
    }
}
const mapPropsToState = (state) => {
    return {
        // changeNowMember: state.home.changeNowMember
    }
};
const dispatchToProps = (dispatch) => {
    return {
        // clearNowMember: () => dispatch(clearNowMember())
    }
}
export default connect(mapPropsToState, dispatchToProps)(MemberForm);