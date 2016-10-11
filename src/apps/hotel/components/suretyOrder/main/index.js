// @flow
import React, { PropTypes,Component } from 'react'
import style from './style.css'
import classnames from 'classnames'
import { Button} from '@boluome/blm-web-components'
class Main extends Component{
  constructor(props){
    super(props)
    this.state={
      cardNo:'',
      HolderName:'',
      IdType:'IdentityCard',
      IdNo:'',
      ExpirationYear:'',
      ExpirationMonth:'',
      CVV:'',
      price:''
    }
  }
  componentWillMount(){
    const orderInfo = JSON.parse(localStorage.getItem('HOTEL_ORDER'))
    const price = orderInfo.submitInfo.price
    this.setState({price:price,cardNo:orderInfo.cardNo})
  }
  saveCardName (e){
    const cardName = e.target.value.replace(/(^\s+)|(\s+$)/g,"")
    this.setState({HolderName:cardName})
  }
  saveCardType(e){
    const IdType = e.target.value.replace(/(^\s+)|(\s+$)/g,"")
    this.setState({IdType:IdType})
  }
  saveCardId(e){
    const IdNo = e.target.value.replace(/(^\s+)|(\s+$)/g,"")
    this.setState({IdNo:IdNo})
  }
  saveCardNumber(e){
    const cardNumber = e.target.value.replace(/(^\s+)|(\s+$)/g,"")
    this.setState({CVV:cardNumber})
  }
  saveOrder(){
    const { submitOrder } = this.props
    let saveOrder = JSON.parse(localStorage.getItem('HOTEL_ORDER')).submitInfo || {}
    const { cardNo , CVV , ExpirationYear , ExpirationMonth ,HolderName , IdType , IdNo } = this.state
    const CreditCard = {
      Number:cardNo,
      CVV:CVV,
      ExpirationYear:ExpirationYear,
      ExpirationMonth:ExpirationMonth,
      HolderName:HolderName,
      IdType:IdType,
      IdNo:IdNo
    }
    saveOrder.CreditCard = CreditCard
    submitOrder(saveOrder)
  }
  validityTime(e){
    let validity = e.target.value.replace(/(^\s+)|(\s+$)/g,"")
    validity = validity.split('/')
    this.setState({ExpirationMonth:validity[0],ExpirationYear:validity[1]})
  }
  render(){
    const cardType = [{
      name:'身份证',
      IdType:'IdentityCard'
    },{
      name:'护照',
      IdType:'Passport'
    },{
      name:'其他',
      IdType:'Other'
    }]
    const cardTypeNode = cardType.map((item,index) =>
      <option key = {index} value = {item.IdType}>{item.name}</option>
    )
    const cardNo = this.state.cardNo
    const price = this.state.price
    return (
      <div className = {style.order}>
        <div className = {style.orderDes}>
          <h4>连锁店</h4>
          <div className = {style.orderTime}>
            <p>入住:09月26日 离店:09月27日 共1晚</p>
          </div>
          <div className = {style.orderTime}>
            <p>大床房(限时抢购)(内宾)(特价) 15-20平方米 | 大床1.5米</p>
          </div>
          <div className = {style.suretyMoney}>
            <span>担保金额</span>
            <strong>￥{price}</strong>
          </div>
        </div>
        <div className = {style.orderInfo}>
          <ul className = {style.orderList}>
            <li>
              <span>信用卡号:</span>
              <span>{cardNo}</span>
            </li>
            <li>
              <span>姓名</span>
              <input type = "text" onChange = { (e) => this.saveCardName(e) } placeholder = "持卡人姓名"/>
            </li>
            <li>
              <select className = {style.cardType} value = 'IdentityCard' onChange = { (e) => this.saveCardType(e) }>
                {cardTypeNode}
              </select>
              <input type = "text" onChange = { (e) => this.saveCardId(e) } placeholder = "请输入证件号码"/>
            </li>
            <li>
              <span>有效期</span>
              <input type = "text" onChange = { (e) => this.validityTime(e)} placeholder = "月/年，如04/16"/>
            </li>
            <li>
              <span>安全验证码</span>
              <input type = "number" onChange = { (e) => this.saveCardNumber(e) } placeholder = "卡背面后三位数字"/>
            </li>
          </ul>
        </div>
        <div className = {style.saveOrder} onClick = { () => this.saveOrder()} >
          <Button type = 'primary' title = '确认下单' style={{width:'100%',height:'50px'}}/>
        </div>
      </div>
    )
  }
}
export default Main
