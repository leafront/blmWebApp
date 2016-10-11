// @flow
import React, { PropTypes,Component } from 'react'
import style from './style.css'
import classnames from 'classnames'
import Popup from '../popup'
import { browserHistory } from 'react-router'
import imgAddress from '../../../images/address.png'
import imgHotel from '../../../images/hotel_detail.png'
import imgArrowDown from '../../../images/arrow_down.png'
import imgArrowUp from '../../../images/arrow_up.png'
const Main = ({data,toggleHouseList ,id , hotelInfo , togglePopup , roomId , channel }) => {
  const hotelId = data.id
  let saveOrder = {}
  let storeInfo = JSON.parse(localStorage.getItem('HOTEL_INFO')) || {}
  saveOrder.userId = "blm_abc"
  saveOrder.customerId = "blm"
  saveOrder.customerUserId = "blm_abc"
  saveOrder.HotelId = hotelId
  saveOrder.HotelName = data.name
  saveOrder.HotelAddr = data.address
  saveOrder.HotelImg = data.image
  saveOrder.HotelTel = data.phone
  saveOrder.lng = storeInfo.lng
  saveOrder.lat = storeInfo.lat
  saveOrder.ArrivalDate = storeInfo.starTime
  saveOrder.DepartureDate = storeInfo.DepartureDate
  localStorage.setItem('HOTEL_ORDER',JSON.stringify(saveOrder))
  const itemNodes=data.rooms.map((item,index)=>
    <ListItem
      key = {index}
      id = {id}
      index = {index}
      roomId = {roomId}
      hotelId ={hotelId}
      data = {item}
      channel = {channel}
      togglePopup = { (planId) => togglePopup(planId) }
      toggleHouseList={(index) => toggleHouseList(index)}/>
  )
  const startTime = hotelInfo.startTime.split('-')
  const endTime = hotelInfo.endTime.split('-')
  const totalDays = endTime[2] - startTime[2]
  return (
    <div className={style.detail}>
      <div className={style.banner} onClick = { () => browserHistory.push(`/hotel/photoList/${hotelId}?chnnel=${channel}`)}>
        <img src={data.image}/>
        <div className={style.bannerTxt}>
          <div className={style.info}>
            <h5>{data.name}</h5>
            <span>{data.type}|</span><span>推荐度{data.recommend}</span>
          </div>
          <div className={style.desc}>
            <span>{data.imageCount}张图片</span>
          </div>
        </div>
      </div>
      <div className={style.address}>
        <ul className={style.addressList}>
          <li>
            <img src = {imgAddress} />
            <span>地址:{data.address}</span>
          </li>
          <li onClick = {() => browserHistory.push(`/hotel/introduce/${hotelId}?channel=${channel}`)}>
            <img src = {imgHotel}/>
            <span>酒店详情</span>
          </li>
        </ul>
      </div>
      <ul className={style.times}>
        <li>
          <span>入住</span>
          <time>{hotelInfo.startTime}</time>
        </li>
        <li className={style.total}>
          <span>共{totalDays}晚</span>
        </li>
        <li>
          <span>离店</span>
          <time>{hotelInfo.endTime}</time>
        </li>
      </ul>
      <div className={style.listWrap}>
        <ul className={style.listMenu}>
          {itemNodes}
        </ul>
      </div>
    </div>
  )
}

const ListItem = ({ index , data , id , roomId , hotelId , channel , togglePopup , toggleHouseList}) => {
  const houseNodes=data.ratePlans.map((item,i)=>
    <HouseList key = {i}
      togglePopup = { (planId) => togglePopup(planId) }
      roomId = {roomId}
      index = { index }
      data = {item}
      hotelId = {hotelId}
      id = {id}
      channel = {channel}
      houseData = {data}/>
    )
  const arrowImg = index == id ? {background:`url(${imgArrowUp}) no-repeat right center`} :{background:`url(${imgArrowDown}) no-repeat right center`}
  return (
    <li>
      <div className={style.listWrap}>
        <div className={style.info}>
          <img className={style.pic} src={data.pic}/>
          <div className={style.desc}>
            <h4>{data.name}</h4>
            <span>{data.info}</span>
          </div>
          <div style = {arrowImg} className={style.price} onClick = {() => {toggleHouseList(index)} }>
            <i>￥</i><strong>{data.price}</strong><span>起</span>
          </div>
        </div>
      </div>
      {houseNodes}
    </li>
  )
}

class HouseList extends Component{
  constructor(props){
    super(props)
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
    console.log(guaranteeHoldTime)
    saveOrder.guaranteeRule = guaranteeRuleData
    saveOrder.currencyCode = currencyCode
    saveOrder.price = price
    saveOrder.cancelPolicies = cancelPolicies
    saveOrder.name = name
    saveOrder.info = info
    localStorage.setItem('HOTEL_ORDER',JSON.stringify(saveOrder))
  }
  render(){
    const { data , id , houseData , channel , hotelId , roomId , togglePopup , index} = this.props
    const name = houseData.name+data.name
    return (
      <div className={classnames(style.listItem,id===index?style.active:'')}>
        <div className={style.houseType}>
          <span onClick = { () => togglePopup(data.planId)}>{name}</span>
          <strong><i>￥</i>{data.price}</strong>
          <div className={classnames(style.orderBtn,data.status==true?'':style.active)}>
            {
              data.status===true?
              <span
                onClick = { this.storeOrder.bind(this,
                  channel,
                  data.typeId,
                  data.planId,
                  data.customerType,
                  data.category,
                  data.paymentType,
                  data.guaranteeRule,
                  data.currencyCode,
                  data.price,
                  data.cancelPolicies,
                  houseData.name,
                  houseData.info,
                  data.guaranteeTypeCode || null,
                  data.guaranteeHoldTime || null
                )} >预订</span>
              :
              <span>订完</span>
            }
            <span>{data.status===true?'到店付':'预付'}</span>
          </div>
        </div>
        {
          data.planId == roomId? <Popup data = {data} channel = {channel} houseData = {houseData} name = {name} togglePopup = {(arg) => togglePopup(arg)}></Popup>:null
        }
      </div>
    )
  }
}
export default Main
