// @flow
import React, { PropTypes , Component } from 'react'
import style from './style.css'
import classnames from 'classnames'
import { Button } from '@boluome/blm-web-components'
class starPrice extends Component{
    constructor(props){
      super(props)
    }
    render (){
      const { toggleActive,active , page , searchKey , storeInfo , channel , getHotelData , getHotelInfo , hotelInfo } = this.props;
      return (
          <div>
            <div className={classnames(style.popup,active=='star'?style.active:'')} onClick = {()=>toggleActive('')}>
            </div>
            <StarPopup
              channel = {channel}
              storeInfo = {storeInfo}
              page = {page}
              active = {active}
              searchKey = { searchKey }
              hotelInfo = {hotelInfo}
              getHotelData = {(arg) => getHotelData(arg)}
              getHotelInfo = {(type,id) => getHotelInfo(type,id)}
              toggleActive = {(index) => toggleActive(index)}/>
          </div>
      )
    }
}
class StarPopup extends Component{
  constructor(props){
    super(props)
    this.state = {
      starIndex:0,
      priceIndex:0
    }
  }
  starActive (index){
    return index==this.state.starIndex ? style.active :""
  }
  priceActive (index){
    return index==this.state.priceIndex ? style.active :""
  }
  render (){
    const star = [{
        "id": 0,
        "name": "不限"
      },
      {
          "id": 0,
          "name": "二星以下/经济"
      },
      {
          "id": 3,
          "name": "三星/舒适型"
      },
      {
          "id": 4,
          "name": "四星/高档型"
      },
      {
          "id": 5,
          "name": "五星/豪华型"
    }]
    const price = [{
      "lowRate":'',
      "highRate":'',
      "name":"不限"
    },{
      "lowRate":'',
      "highRate":150,
      "name":"￥150以下"
    },{
      "lowRate":150,
      "highRate":300,
      "name":"￥150-300"
    },{
      "lowRate":301,
      "highRate":450,
      "name":"￥301-450"
    },{
      "lowRate":451,
      "highRate":600,
      "name":"￥451-600"
    },{
      "lowRate":601,
      "highRate":1000,
      "name":"￥601-1000"
    },{
      "lowRate":1000,
      "highRate":'',
      "name":"￥1000以上"
    }]
    const { toggleActive , hotelInfo , page , channel , active , searchKey , storeInfo , getHotelData , getHotelInfo } = this.props
    const starNodes = star.map((item,index) =>
      <li key = { index } className={this.starActive(index)} onClick = {()=> { getHotelInfo('star',item.id); this.setState({starIndex:index}) }}>{item.name}</li>
    )
    const priceNodes = price.map((item,index) =>
      <li key = { index } className={this.priceActive(index)} onClick = {()=> { getHotelInfo('price',[item.lowRate,item.highRate]); this.setState({priceIndex:index})}}>{item.name}</li>
    )
    let queryText
    if(queryText) queryText = searchKey.QueryText || ""
    return (
      <div className={classnames(style.starPrice,active=='star'?style.active:'')}>
        <h4>星级（可多选）</h4>
        <ul className={style.starList}>
          { starNodes }
        </ul>
        <h4>价格</h4>
        <ul className={classnames(style.starList,style.priceList)}>
          {priceNodes}
        </ul>
        <div className={style.footer}>
          {
            page == 'index' ?
            <Button type = 'primary' title = '确定' onClick = { () => toggleActive('') } style={{width:'60%',marginTop:10,height:40}} />
            :
            <Button type = 'primary' title = '确定'
              onClick = { () =>{
               getHotelData({
                 PageIndex: 1,
                 DistanceType: 1,
                 DepartureDate:storeInfo.endTime,
                 channel: channel,
                 PageSize: 10,
                 ArrivalDate:storeInfo.startTime,
                 StarRate:hotelInfo.StarRate,
                 CityId: storeInfo.cityId,
                 LowRate:hotelInfo.LowRate,
                 HighRate:hotelInfo.HighRate,
                 BrandId:hotelInfo.BrandId || storeInfo.BrandId,
                 DistrictId:hotelInfo.DistrictId || storeInfo.BrandId,
                 Zone:hotelInfo.Zone || storeInfo.Zone,
                 QueryText:queryText,
                 Facilities:hotelInfo.Facilities,
                 ThemeIds:hotelInfo.ThemeIds,
                 Sort:hotelInfo.Sort,
                 lng:storeInfo.lng,
                 lat:storeInfo.lat
                });
                toggleActive('')
              }}
              style={{width:'90%',marginTop:10,height:50}} />
          }
        </div>
      </div>
    )
  }
}
export default starPrice
