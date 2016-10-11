// @flow
import React, { PropTypes,Component } from 'react'
import style from './style.css'
import classnames from 'classnames'
import { Button} from '@boluome/blm-web-components'
class Location extends Component{
  constructor(props){
    super(props)
    this.state = {
      tabIndex:0,
      itemIndex:-1
    }
  }
  itemToggleActive(i){
    return i==this.state.itemIndex ? style.active:'';
  }
  toggleTabActive(i){
    return i==this.state.tabIndex ? style.active:'';
  }
  render(){
    const { locationData , toggleActive , searchKey , active , getHotelData , channel , storeInfo , hotelInfo , getHotelInfo } = this.props
    const list = ['districts','commericalLocations','landmarkLocations']
    let titleName
    if(channel == 'elong'){
      titleName = ['行政区','商圈','地标']
    }else if(channel == 'ctrip'){
      titleName = ['行政区','商圈']
    }else{
        titleName = ['行政区']
    }
    const queryText = searchKey.QueryText || ""
    const idx = this.state.tabIndex;
    const itemName = titleName.map((item,index) =>
        <li key = { index } className={this.toggleTabActive(index)} onClick = { () =>{ this.setState({tabIndex:index})}}>{item}</li>
    )
    let listNodes = []
    if(locationData[list[idx]]){
      listNodes = locationData[list[idx]].map((item,index) =>
        <li key = { index } className = {this.itemToggleActive(index)} onClick = { () =>{getHotelInfo(list[idx],item.id);  this.setState({itemIndex:index}) }}>{item.name}</li>
      )
    }
    return (
      <div className = {classnames(style.wrap,active=='location'?style.active:'')}>
        <div className={style.filter}>
          <ul className={style.menu}>
            {itemName}
          </ul>
          <div className={style.tabList}>
            <h4>{titleName[idx]}</h4>
            <ul className={style.tabMenu}>
              {listNodes}
            </ul>
          </div>
        </div>
        <div className={style.footer}>
          <Button type = 'primary' title = '确定' onClick = {() => {
             getHotelData({
               PageIndex: 1,
               DistanceType: 1,
               DepartureDate:storeInfo.endTime,
               channel: channel,
               PageSize: 20,
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
              toggleActive('') }}
              style={{width:'100%'}}/>
        </div>
      </div>
    )
  }
}
export default Location
