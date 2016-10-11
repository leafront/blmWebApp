// @flow
import React, { PropTypes , Component } from 'react'
import style from './style.css'
import classnames from 'classnames'
import { Button } from '@boluome/blm-web-components'
const Sort = ({toggleActive , active , channel , searchKey , storeInfo , hotelInfo , getHotelData ,getHotelInfo})=> {
    return (
        <div>
          <div className={classnames(style.popup,active=='sort'?style.active:'')} onClick = {()=>toggleActive('')}>
          </div>
          <SortPopup
            channel = {channel}
            active = { active }
            searchKey = { searchKey }
            storeInfo = {storeInfo}
            hotelInfo = {hotelInfo}
            getHotelInfo = {(name,id) => getHotelInfo(name,id)}
            getHotelData = {(arg) => getHotelData(arg)}
            toggleActive = {(index) => toggleActive(index)}/>
        </div>
    )
}

class SortPopup extends Component{
  constructor(props){
    super(props)
    this.state = {
      sortIndex:0
    }
  }
  sortActive (index){
    return index==this.state.sortIndex ? style.active :""
  }
  render (){
    const sortList = [
        {
            "id": "DistanceAsc",
            "name": "由近到远"
        },
        {
            "id": "RateAsc",
            "name": "价格  低到高"
        },
        {
            "id": "RateDesc",
            "name": "价格  高到低"
        },
        {
            "id": "StarRankDesc",
            "name": "推荐星级  高到低"
        }
    ]
    const { toggleActive , channel ,storeInfo , active , searchKey , hotelInfo , getHotelData ,getHotelInfo } = this.props
    const sortNodes=sortList.map((item,index) =>
      <li key = { index } className={this.sortActive(index)} onClick = { () =>{ getHotelInfo('sort',item.id); this.setState({sortIndex:index}) } }>{item.name}</li>
    )
    const queryText = searchKey.QueryText || ""
    return (
      <div className={classnames(style.sort,active == 'sort'? style.active:'')}>
        <h4>排序</h4>
        <ul className = {style.sortList}>
          {sortNodes}
        </ul>
        <Button type = 'primary' title = '确定'
          onClick = {() =>{
            getHotelData({
              PageIndex: 1,
              DistanceType: 1,
              DepartureDate:storeInfo.endTime,
              channel: channel,
              PageSize: 20,
              ArrivalDate:storeInfo.startTime,
              StarRate:storeInfo.StarRate,
              CityId: storeInfo.cityId,
              LowRate:storeInfo.LowRate,
              HighRate:storeInfo.HighRate,
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
             toggleActive('');
          }}
          style={{width:'100%'}}/>
      </div>
    )
  }
}
export default Sort
