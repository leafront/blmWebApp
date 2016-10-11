// @flow
import React, { PropTypes , Component } from 'react'
import style from './style.css'
import classnames from 'classnames'
import { Button } from '@boluome/blm-web-components'
import { Toast } from '@boluome/blm-web-components'
class BindCard extends Component{
  constructor(props){
    super(props)
    this.state={
      cardNo:""
    }
  }
  saveCardNo (e){
    const cardNo = e.target.value.replace(/(^\s+)|(\s+$)/g,"")
    this.setState({cardNo:cardNo})
  }
  saveOrder(){
     const { checkCreditCard , channel } = this.props
     const cardNo = this.state.cardNo
     if(cardNo == ""){
       Toast('error','请输入银行卡号')
       return false
     }
     let orderInfo = JSON.parse(localStorage.getItem('HOTEL_ORDER')) || {}
     orderInfo.cardNo = cardNo
     localStorage.setItem('HOTEL_ORDER',JSON.stringify(orderInfo))
     checkCreditCard(channel,cardNo)
  }
  render(){
    return (
      <div className = {style.bindCard}>
        <div className = {style.cardInfo}>
          <span>卡号</span>
          <input className = {style.inputCard} onChange = {(e) => this.saveCardNo(e)} placeholder = "请输入信用卡号"/>
        </div>
        <div className = 'modal-close' onClick = {() => this.saveOrder()}>
          <Button type = 'primary' title = '下一步' style={{width:'100%'}}/>
        </div>
      </div>
    )
  }
}
export default BindCard
