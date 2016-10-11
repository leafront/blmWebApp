// @flow
import React, { PropTypes,Component } from 'react'
import style from './style.css'
import classnames from 'classnames'
import BindCard from '../bindCard'
import { Toast , Modal } from '@boluome/blm-web-components'
class Main extends Component{
  constructor(props){
    super(props)
    this.state={
      houseType:'',
      houseArea:'',
      hotelName:'',
      roomsTotal:10,
      currentRoomTotal:1,
      customerTotal:1,
      roomTime:[],
      price:'',
      totalPrice:'',
      currentDate:'',
      currentHours:'',
      earliestArrivalTime:'',
      latestArrivalTime:'',
      orderRooms:[],
      guaranteeTypeCode:'', //担保类型(只有携程需要)
      guaranteeAmount:'',//担保金额(只有携程需要)
      guaranteePayType:'',//担保支付类型(只有携程需要) 0:信用卡担保 1:现金担保
      userName:'',
      mobile:'',
      startTime:'',
      endTime:'',
      creditCard:null,
      startDate:'',
      endDate:'',
      isGuarantee:false   //是否需要担保
    }
  }
  getArrivalDate(){
    const d = new Date()
    let hours =new Date().getHours()
    const year = d.getFullYear()
    const month = d.getMonth()+1<10?'0'+(d.getMonth()+1):d.getMonth()+1
    const  date = d.getDate()+1<10?'0'+(d.getDate()+1):d.getDate()+1
    const currentHour = d.getHours()<10 ? '0'+d.getHours():d.getHours()
    const minutes = d.getMinutes()
    const times = year + '-' + month + '-' + date + ' ' + (currentHour+1) + ':00'
    let roomTime = this.state.roomTime
    let titleName
    const currentDate = year + '-' + month + '-'

    if( minutes >= 0){
      hours += 4
      this.setState({currentHours:hours})
      roomTime.push({'times':currentDate+date+' '+(currentHour+2)+':00','name':'马上到店(1小时)','hours':(currentHour+2)})
      if(hours <= 14){
        for(var i = 14;i<=30;i++){
          switch (i) {
            case 24:
              titleName = '凌晨00:00'
              roomTime.push({times:currentDate+(date+1)+' 00:00',name:titleName,hours:i})
              break;
            case 25:
              titleName = '凌晨01:00'
              roomTime.push({times:currentDate+(date+1)+' 01:00',name:titleName,hours:i})
              break;
            case 26:
              titleName = '凌晨02:00'
              roomTime.push({times:currentDate+(date+1)+' 02:00',name:titleName,hours:i})
              break;
            case 27:
              titleName = '凌晨03:00'
              roomTime.push({times:currentDate+(date+1)+' 03:00',name:titleName,hours:i})
              break;
            case 28:
              titleName = '凌晨04:00'
              roomTime.push({times:currentDate+(date+1)+' 04:00',name:titleName,hours:i})
              break;
            case 29:
              titleName= '凌晨05:00'
              roomTime.push({times:currentDate+(date+1)+' 05:00',name:titleName,hours:i})
              break;
            case 30:
              titleName = '凌晨06:00'
              roomTime.push({times:currentDate+(date+1)+' 06:00',name:titleName,hours:i})
              break;
            default:
              roomTime.push({times:currentDate+date+' '+i+':00',name:i+':00',hours:i})
          }
        }
      }else if(hours > 14){
        for(var j = hours; j<=30;j++){
          switch (j) {
            case 24:
              titleName = '凌晨00:00'
              roomTime.push({times:currentDate+(date+1)+' 00:00',name:titleName,hours:j})
              break;
            case 25:
              titleName = '凌晨01:00'
              roomTime.push({times:currentDate+(date+1)+' 01:00',name:titleName,hours:j})
              break;
            case 26:
              titleName = '凌晨02:00'
              roomTime.push({times:currentDate+(date+1)+' 02:00',name:titleName,hours:j})
              break;
            case 27:
              titleName = '凌晨03:00'
              roomTime.push({times:currentDate+(date+1)+' 03:00',name:titleName,hours:j})
              break;
            case 28:
              titleName = '凌晨04:00'
              roomTime.push({times:currentDate+(date+1)+' 04:00',name:titleName,hours:j})
              break;
            case 29:
              titleName = '凌晨05:00'
              roomTime.push({startTime:'05:00',times:currentDate+(date+1)+' 05:00',name:titleName,hours:j})
              break;
            case 30:
              titleName = '凌晨06:00'
              roomTime.push({times:currentDate+(date+1)+' 06:00',name:titleName,hours:j})
              break;
            default:
              roomTime.push({times:currentDate+date+' '+j+':00',name:j+':00',hours:j})
          }
        }
      }
    }
    const isGuarantee = this.isGuarantee(currentHour+1,currentHour+2)
    this.setState({isGuarantee:isGuarantee,startTime:currentHour+1,endTime:currentHour+2,arliestArrivalTime:currentDate+date+' '+(currentHour+1)+':00',latestArrivalTime:roomTime[0].times,roomTime:roomTime})
  }
  componentWillMount(){
    const { channel } = this.props
    let orderInfo = JSON.parse(localStorage.getItem('HOTEL_ORDER'))
    const hotelInfo = JSON.parse(localStorage.getItem('HOTEL_INFO'))
    let startDate = hotelInfo.startTime.split('-')
    let endDate = hotelInfo.endTime.split('-')
    this.setState({startDate:startDate,endDate:endDate,hotelName:orderInfo.HotelName,price:orderInfo.price,houseType:orderInfo.name,houseArea:orderInfo.info,totalPrice:orderInfo.price})
    this.getArrivalDate()
    if(channel == 'elong'){
      this.setState({guaranteePayType:0})
    }
  }
  isGuarantee(iStartTime,iEndTime){
    const { channel } = this.props
    let orderInfo = JSON.parse(localStorage.getItem('HOTEL_ORDER'))
    const hotelInfo = JSON.parse(localStorage.getItem('HOTEL_INFO'))
    const iStartDate = new Date(hotelInfo.startDate).getTime()
    const iEndDate = new Date(hotelInfo.startDate).getTime()
    const guaranteeRule = orderInfo.guaranteeRule
    if(guaranteeRule==null){
      return false
    }
    const iAmount = this.state.currentRoomTotal

    let { StartTime, EndTime , StartDate , EndDate , Amount , DateType , IsAmountGuarantee , IsTimeGuarantee , guaranteeTypeCode , guaranteeHoldTime } = guaranteeRule
    guaranteeHoldTime = guaranteeHoldTime ? parseInt(guaranteeHoldTime): guaranteeHoldTime
    StartDate = new Date(StartDate).getTime()
    EndDate = new Date(EndDate).getTime()
    StartTime = parseInt(StartTime)
    EndTime = parseInt(EndTime)+24
    switch (channel) {
      case 'elong':
        if(DateType == "CheckInDay"){
          if(iStartDate>=StartDate && iStartDate<=EndDate){
            if(IsAmountGuarantee==false && IsTimeGuarantee == false){
                return true
            }else if(IsAmountGuarantee == true && IsTimeGuarantee ==false){
              if(iAmount>Amount){
                return true
              }
              return false
            }else if(IsTimeGuarantee == true && IsAmountGuarantee == false){
              if(StartTime >= EndTime){
                return true
              }else{
                if(iEndTime >= StartTime && iEndTime <= EndTime ){
                  return true
                }else{
                  return false
                }
              }
            }else if(IsAmountGuarantee == true && IsTimeGuarantee == true){
              console.log(iEndTime,StartTime,EndTime)
              if(iAmount>Amount){
                return true
              }else if(iEndTime >= StartTime && iEndTime <= EndTime ){
                return true
              }
              return false
            }
          }else{
              return false
          }
        }else if(DateType == "StayDay"){
          if(iStartDate>=StartDate && iStartDate<=EndDate){
            if(IsAmountGuarantee==false && IsTimeGuarantee == false){
                return true
            }else if(IsAmountGuarantee == true && IsTimeGuarantee ==false){
              if(iAmount>Amount){
                return true
              }
              return false
            }else if(IsTimeGuarantee == true && IsAmountGuarantee == false){
              if(StartTime >= EndTime){
                return true
              }else{
                if(iEndTime >= StartTime && iEndTime <= EndTime ){
                  return true
                }else{
                  return false
                }
              }
            }else if(IsAmountGuarantee == true && IsTimeGuarantee == true){
              if(iAmount>Amount){
                return true
              }else if(iEndTime >= StartTime && iEndTime <= EndTime ){
                return true
              }
              return false
            }
          }else{
              return false
          }
        }
        break;
      case 'ctrip':
        if(guaranteeTypeCode!=='' && guaranteeTypeCode == '3'){
          if(guaranteeHoldTime && iEndTime > guaranteeHoldTime){
            return true
          }
        }
        return false
        break;
      default:
       return false
    }

  }
  selectRoom(e){
    const total = parseInt(e.target.value)
    this.setState({
      currentRoomTotal:total,
      totalPrice:total*this.state.price
    })
    const { startTime , endTime } = this.state
    const isGuarantee = this.isGuarantee(starTime,endTime)
    this.setState({isGuarantee:isGuarantee})
  }
  selectUserName(e,index){
    const userName = this.state.orderRooms
    const name = e.target.value.replace(/(^\s+)|(\s+$)/g,"")
    if(userName[index]){
      if(userName[index].i == index){
        userName[index].name = name
      }else{
        userName.push({name:name,i:index})
      }
    }else{
      userName.push({name:name,i:index})
    }
    this.setState({orderRooms:userName})
    if(index==0){
      this.setState({userName: name})
    }
  }
  savePhone(e){
    const phone = e.target.value.replace(/(^\s+)|(\s+$)/g,"")
    this.setState({mobile:phone})
  }
  selectTime(e){
    const d = new Date()
    const year = d.getFullYear()
    const month = d.getMonth()+1<10?'0'+(d.getMonth()+1):d.getMonth()+1
    const timesData = e.target.value.split(',')
    const date = timesData[0]
    const endTime = parseInt(timesData[1])
    const currentHours = this.state.currentHours
    const day = new Date().getDate()
    const currentDate = year + '-' + month + '-'
    this.setState({endTime:endTime,startTime:endTime-1,earliestArrivalTime:currentDate+day+' '+(endTime-1)+':00',latestArrivalTime:date})
    const isGuarantee = this.isGuarantee(endTime-1,endTime)
    this.setState({isGuarantee:isGuarantee})
  }
  saveOrder(isGuarantee){
    const { submitOrder , checkCreditCard , channel , cardInfo , ipAddress } = this.props
    const hotelInfo = JSON.parse(localStorage.getItem('HOTEL_INFO'))
    const orderInfo = JSON.parse(localStorage.getItem('HOTEL_ORDER'))
    const order = this.state
    const NumberOfRooms =order.currentRoomTotal
    const EarliestArrivalTime = order.earliestArrivalTime
    const LatestArrivalTime =order.latestArrivalTime
    const IsGuarantee = isGuarantee
    const GuaranteeTypeCode = order.GuaranteeTypeCode
    const GuaranteeAmount = order.GuaranteeAmount
    const GuaranteePayType = order.guaranteePayType
    const OrderRooms = order.orderRooms

    const mobile = order.mobile
    const userName = order.userName

    const price = order.price
    const Contact = {Name:userName,Mobile:mobile}
    const CreditCard = order.creditCard
    const { lng , lat , startTime , endTime } = hotelInfo
    const {
       HotelId ,
       HotelName ,
       HotelTel ,
       HotelAddr ,
       HotelImg ,
       RoomTypeId ,
       RatePlanId,
       RatePlanCategory,
       CustomerType,
       PaymentType,
       currencyCode,
    } = orderInfo
    if(userName == ""){
      Toast('error','请输入入住人姓名')
      return false
    }
    if(mobile == ""){
      Toast('error','请输入您的手机号')
      return false
    }
    let ordeRoomsResult =[]
    OrderRooms.forEach((item,index) => {
      var obj = {
        Customers:[{
            Mobile:mobile,
            Name:item.name,
            Nationality:'China'
        }]
      }
      ordeRoomsResult.push(obj)
    })
    //提交订单
    const submitInfo = {
        channel:channel,
        userId:'blm_abc',
        customerId:'blm',
        customerUserId:'blm_abc',
        price:price,
        HotelId:HotelId,
        HotelName:HotelName,
        HotelTel:HotelTel,
        HotelAddr:HotelAddr,
        HotelImg:HotelImg,
        lng:lng,
        lat:lat,
        RoomTypeId:RoomTypeId,
        RatePlanId:RatePlanId,
        RatePlanCategory:RatePlanCategory,
        ArrivalDate:startTime,
        DepartureDate:endTime,
        CustomerType:CustomerType,
        PaymentType:PaymentType,
        NumberOfRooms:NumberOfRooms,
        NumberOfCustomers:NumberOfRooms,
        EarliestArrivalTime:EarliestArrivalTime,
        LatestArrivalTime:LatestArrivalTime,
        CurrencyCode:currencyCode,
        CustomerIPAddress:ipAddress,
        IsGuarantee:IsGuarantee,
        GuaranteeTypeCode:GuaranteeTypeCode,
        GuaranteeAmount:GuaranteeAmount,
        GuaranteePayType:GuaranteePayType,
        OrderRooms:ordeRoomsResult,
        Contact:Contact,
        userPhone:mobile,
        CreditCard:CreditCard
    }
    if(IsGuarantee){
        Modal(
          'fullScreen',
          <BindCard channel = {channel}
            checkCreditCard = {(channel,cardNo) => checkCreditCard(channel,cardNo)}/>
        )
        orderInfo.submitInfo = submitInfo
        orderInfo.submitInfo.price = this.state.totalPrice
        localStorage.setItem('HOTEL_ORDER',JSON.stringify(orderInfo))
    }else{
      submitOrder(submitInfo)
    }
  }
  render(){
    const { location , channel } = this.props
    const roomTimeList = this.state.roomTime.map((item,index) =>
        <option key = {index} value = {item.times+','+item.hours}>{item.name}</option>
    )
    const custormerNode = []
    for (let i = 0;i< this.state.currentRoomTotal;i++){
      custormerNode.push(<li key = {i}><span>入住人</span><input type = "text"  onChange = {(e) => this.selectUserName(e,i)} placeholder = "入住人姓名"/></li>)
    }
    let roomsList =[]
    for(let m=1; m<=this.state.roomsTotal;m++){
        roomsList.push(<option key = {m} value = {m}>{m}间</option>)
    }
    const { totalPrice , roomTime , isGuarantee , houseType , houseArea , startDate , endDate , price , hotelName } = this.state
    return (
      <div className = {style.order}>
        <div className = {style.orderDes}>
          <h4>{ hotelName }</h4>
          <div className = {style.orderTime}>
            <p>入住:{startDate[1]+'月'+startDate[2]+'日'} 离店:{endDate[1]+'月'+endDate[2]+'日'} 共{endDate[2]-startDate[2]}晚</p>
          </div>
          <div className = {style.orderTime}>
            <p>{houseType}{houseArea}</p>
          </div>
        </div>
        <div className = {style.orderInfo}>
          <ul className = {style.orderList}>
            <li>
              <span>房间数</span>
              <select onChange = {this.selectRoom.bind(this)}>
                {roomsList}
              </select>
            </li>
            <li>
              <span>最晚到店</span>
              <select defaultValue = {roomTime[0].times+','+roomTime[0].hours} onChange ={(e) => this.selectTime(e)}>
                {roomTimeList}
              </select>
            </li>
            {custormerNode}
            <li>
              <span>手机号</span>
              <input type = "tel" onChange = {(e) => this.savePhone(e)} placeholder = "请输入您的手机号"/>
            </li>
          </ul>
        </div>
        <div className = {style.roomRule}>
          <h4>取消规则</h4>
          <p>
            {endDate[0]+'年'+endDate[1]+'月'+endDate[2]+'日00时00分前取消扣取罚金'+price+'元，'+endDate[0]+'年'+endDate[1]+'月'+endDate[2]+'日00时00分后不可取消'}
          </p>
        </div>
        <div className = {style.saveOrder}>
          <strong>￥{totalPrice}</strong>
          <span>费用明细</span>
          {
            isGuarantee?<button
              onClick = { () =>
              this.saveOrder(isGuarantee)
            }>去担保</button>
            :<button onClick = {() => this.saveOrder(isGuarantee) }>立即下单</button>
          }
        </div>
      </div>
    )
  }
}
export default Main
