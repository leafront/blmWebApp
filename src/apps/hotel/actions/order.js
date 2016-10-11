// @flow
import libs from 'libs'
import request from 'superagent'
import { Toast } from '@boluome/blm-web-components'
import { browserHistory } from 'react-router'
export const submitOrder = (saveOrder) => dispatch => {
    request.post(`${window.$config.HOST}/jiudian/v1/order/save`, {
      channel:saveOrder.channel,
      userId:saveOrder.userId,
      customerId:saveOrder.customerId,
      customerUserId:saveOrder.customerUserId,
      price:saveOrder.price,
      HotelId:saveOrder.HotelId,
      HotelName:saveOrder.HotelName,
      HotelTel:saveOrder.HotelTel,
      HotelAddr:saveOrder.HotelAddr,
      HotelImg:saveOrder.HotelImg,
      lat:saveOrder.lat,
      lng:saveOrder.lng,
      RoomTypeId:saveOrder.RoomTypeId,
      RatePlanId:saveOrder.RatePlanId,
      RatePlanCategory:saveOrder.RatePlanCategory,
      ArrivalDate:saveOrder.ArrivalDate,
      DepartureDate:saveOrder.DepartureDate,
      CustomerType:saveOrder.CustomerType,
      PaymentType:saveOrder.PaymentType,
      NumberOfRooms:saveOrder.NumberOfRooms,
      NumberOfCustomers:saveOrder.NumberOfCustomers,
      EarliestArrivalTime:saveOrder.EarliestArrivalTime,
      LatestArrivalTime:saveOrder.LatestArrivalTime,
      CurrencyCode:saveOrder.CurrencyCode,
      CustomerIPAddress:saveOrder.CustomerIPAddress,
      IsGuarantee:saveOrder.IsGuarantee,
      GuaranteeTypeCode:saveOrder.GuaranteeTypeCode,
      GuaranteeAmount:saveOrder.GuaranteeAmount,
      GuaranteePayType:saveOrder.GuaranteePayType,
      OrderRooms:saveOrder.OrderRooms,
      Contact:saveOrder.Contact,
      userPhone:saveOrder.userPhone,
      CreditCard:saveOrder.CreditCard
    }).end((err, res) => {
        if (!err && res.statusCode === 200) {
            if (res.body.code !== 0) return Toast('error',JSON.stringify(res.body.message))
            //const orderId = res.body.data.orderId
          //browserHistory.push(`/cashier/orderId`)
        } else {
            Toast('basic','网络状况不好')
        }
    })
}



export const checkCreditCard = (channel,cardNo) => dispatch => {
    request.post(`${window.$config.HOST}/jiudian/v1/checkCreditCard`, {
        channel:channel,
        cardNo:cardNo
    }).end((err, res) => {
        if (!err && res.statusCode === 200) {
            if (res.body.code !== 0) return Toast('error',JSON.stringify(res.body.message))
            const cardInfo = res.body.data
            if(cardInfo.IsValid==false){
              Toast('error','此银行卡不能用')
              return false
            }
            browserHistory.push('/hotel/suretyOrder')
        } else {
            Toast('basic','网络状况不好')
        }
    })
}

const checkCreditCardReturn = (data: Object) => {
    return {
      type: 'CHECK_CREDIT_CARD', data
    }
}


export const getIpAddress = (channel,cardNo) => dispatch => {
    request.get('http://chaxun.1616.net/s.php?type=ip&output=json').end((err, res) => {
        if (!err && res.statusCode === 200) {
            dispatch(getIpAddressReturn(JSON.parse(res.text.slice(1,-1))))
        } else {
            Toast('basic','网络状况不好')
        }
    })
}

const getIpAddressReturn = (data: Object) => {
    return {
      type: 'GET_IP_ADDRESS', data
    }
}
