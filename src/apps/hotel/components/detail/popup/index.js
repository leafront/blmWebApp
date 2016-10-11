// @flow
import React, { PropTypes,Component } from 'react'
import style from './style.css'
import classnames from 'classnames'
import ReactSwipe from 'react-swipe'
import { browserHistory } from 'react-router'
import imgClose from '../../../images/close.png'
class Popup extends Component{
  constructor(props){
    super(props)
    this.state = {
      index:1
    }
  }
  storeOrder(channel,RoomTypeId,RatePlanId,customerType,category,paymentType,guaranteeRule,currencyCode,price,cancelPolicies,name,info,guaranteeTypeCode,guaranteeHoldTime){
    browserHistory.push(`/hotel/order?channel=${channel}`)
    let saveOrder = JSON.parse(localStorage.getItem('HOTEL_ORDER')) || {}
    let guaranteeRuleData = guaranteeRule || {}
    saveOrder.RoomTypeId = RoomTypeId
    saveOrder.RatePlanId = RatePlanId
    saveOrder.CustomerType = customerType
    saveOrder.RatePlanCategory = category || ""
    saveOrder.PaymentType = paymentType
    guaranteeRuleData.guaranteeTypeCode = guaranteeTypeCode
    guaranteeRuleData.guaranteeHoldTime = guaranteeHoldTime
    saveOrder.guaranteeRule = guaranteeRuleData
    saveOrder.currencyCode = currencyCode
    saveOrder.price = price
    saveOrder.cancelPolicies = cancelPolicies
    saveOrder.name = name
    saveOrder.info = info
    localStorage.setItem('HOTEL_ORDER',JSON.stringify(saveOrder))
  }
  render (){
    const { togglePopup , data , channel , houseData , name } = this.props
    const sum = data.images.length;
    const sliderPic = data.images.map((item,index) =>
      <div key = { index } className = {style.slider}><span className = {style.title}>{name}</span><img className ={style.pic} src={item}/></div>
    )
    const facilitiesNodes = houseData.facilities.map((item,index) =>
      <li key = { index }><span>{item.group}:</span><p>{item.data.map((key,index) => key)}</p></li>
    )
    const amenitiesNode = data.amentities.map((item,index) =>
      <li key = {index}><i></i><span>{item.text}</span></li>
    )
    return (
      <div>
        <div className = {classnames(style.popup)} onClick = { (e) => {e.stopPropagation();togglePopup(-1)} }>
        </div>
        <div className = {style.detailPopup}>
          <i onClick = { () => togglePopup(-1) } style = {{background:`url(${imgClose}) no-repeat`,backgroundSize:`24px auto`}} className = {style.detailClose}></i>
          <div className = {style.banner}>
            <ReactSwipe
              className={style.carousel}
              swipeOptions={{
                continuous: false,
                callback:function(index){
                  console.log(index)
                  this.setState({index:index+1})
                }.bind(this)
              }}>
              {sliderPic}
            </ReactSwipe>
            <div className = {style.picBtns}>
              <span>{this.state.index}/{sum}</span>
            </div>
          </div>
          <div className = {style.tag}>
            <ul className = {style.tagList}>
              {amenitiesNode}
            </ul>
          </div>
          <div className = {style.roomDes}>
            <button className ={style.roomMore}>查看更多房型设施</button>
            <ul className = {style.roomList}>
              {facilitiesNodes}
            </ul>
          </div>
          <div className = { style.reserve }>
            <h4>预定须知</h4>
            <ul className = {style.reserveList}>
              <li>
                <span>{data.paymentType=="SelfPay"?'到店付':'预付'}:</span>
                <p>{data.paymentType=="SelfPay"?'到达预定酒店后，向酒店支付房费，无需在线预付房费':'预定酒店后立即在线支付房费'}</p>
              </li>
              <li>
                <span>取消规则:</span>
                <p>{data.cancelPolicies}</p>
              </li>
            </ul>
          </div>
          <div className = {style.priceBtns}>
            <span>￥{data.price}</span>
            <button
              onClick = { this.storeOrder.bind(this,
                channel,
                data.typeId,
                data.planId,
                data.customerType,
                data.category,
                data.paymentType,
                data.guaranteeRule,
                data.cancelPolicies,
                houseData.name,
                houseData.info,
                data.guaranteeTypeCode || null,
                data.guaranteeHoldTime || null
              )}>预定</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Popup
