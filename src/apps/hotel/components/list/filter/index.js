// @flow
import React, { PropTypes,Component } from 'react'
import style from './style.css'
import classnames from 'classnames'
import { browserHistory } from 'react-router'
import { Button} from '@boluome/blm-web-components'
class Filter extends Component{
  constructor(props){
    super(props)
    this.state = {
      tabIndex:0,
      itemIndex:[]
    }
  }
  itemToggleActive(i){
    return i==this.state.itemIndex ? style.active:'';
  }
  toggleTabActive(i){
    return i==this.state.tabIndex ? style.active:'';
  }
  render(){
    const { filterData , toggleActive , active , searchKey , getHotelData , channel , storeInfo , hotelInfo , getHotelInfo } = this.props
    const list = ['brands','facilities','themes']
    const queryText = searchKey.QueryText || ""
    let titleName
    if(channel == 'qunar'){
      titleName = ['品牌']
    }else{
      titleName = ['品牌','设施','主题']
    }
    const idx = this.state.tabIndex;
    const itemName = titleName.map((item,index) =>
        <li key = { index } className={this.toggleTabActive(index)} onClick = { () =>{ this.setState({tabIndex:index})}}>{item}</li>
    )
    let listNodes = []
    if(filterData[list[idx]]){
      listNodes = filterData[list[idx]].map((item,index) =>
        <li key = { index } className = {this.itemToggleActive(index)} onClick = {() =>{ getHotelInfo(list[idx],item.id); this.setState({itemIndex:index}) }}>{item.name}</li>
      )
    }
    return (
      <div className = {classnames(style.wrap,active=='filter'?style.active:'')}>
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
export default Filter
