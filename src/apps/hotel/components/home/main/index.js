// @flow
import React, { PropTypes,Component } from 'react'
import style from './style.css'
import classnames from 'classnames'
import StartTime from '../startTime'
import EndTime from '../endTime'
import { Modal , Search } from '@boluome/blm-web-components'
import { browserHistory } from 'react-router'
import imgLocation from '../../../images/location.png'
class Main extends Component{
  constructor(props){
    super(props)
    this.state = {
      currentIndex:0
    }
  }
  showLocation(){
    const { setCity , channelCode } = this.props
    const hotelSearchCity = (
        <div>
            <a className = 'modal-close'>取消</a>
            <Search type="city" styles={{width: "200px", height: '40px', margin: '1rem', borderRadius: '5px', border: "1px solid gray", padding: '0.3rem'}}
                 searchListStyle={{width: '200px'}} callback = {(c) => {cityVal(c.name,c.id)}} api={`${$config.HOST}/jiudian/v1/cities?channel=${channelCode}`} />
        </div>
    )
    const cityVal = (address,cityId) => {
      document.getElementById('city').innerHTML = address
      let hotelInfo = JSON.parse(localStorage.getItem('HOTEL_INFO')) || {}
      hotelInfo.cityId = cityId
      hotelInfo.address = address
      const regAddress = new RegExp('上海')
      if(!regAddress.test(address)){
        hotelInfo.DistanceType = 1
      }else{
        hotelInfo.DistanceType = 0
      }
      localStorage.setItem('HOTEL_INFO',JSON.stringify(hotelInfo))
    }
    Modal('fullScreen', hotelSearchCity)
  }
  getCurrentPos(){
    const { getLocationData , channelCode } = this.props
    getLocationData(channelCode)
    const hotelInfo = JSON.parse(localStorage.getItem('HOTEL_INFO')) || {}
    document.getElementById('city').innerHTML = hotelInfo.address
  }
  componentDidMount(){
    const { address } = this.props
  }
  render(){
    const { toggleActive,getChannel , address , tabChannel , getLocationData , channelCode , index ,keyWord } = this.props
    const channeNodes = getChannel.map((item,i) =>
      <li className = {index==i?style.active:''} key = { i } onClick = {() =>{ getLocationData(item.code); tabChannel(item.code,i)}}><img src= {item.icon}/>{item.name}</li>
    )
    return (
      <div className={style.wrapContent}>
        <ul className={style.tabList}>
          {channeNodes}
        </ul>
        <div className={style.content}>
          <div className={style.location}>
            <span>目的地</span>
            <p id="city" onClick = { () => this.showLocation() }>{address}</p>
            <div className = {style.point}>
              <img src = {imgLocation} />
              <span onClick = {() => this.getCurrentPos()}>我的位置</span>
            </div>
          </div>
          <ul className={style.times}>
            <li>
              <span>入住</span>
              <StartTime/>
            </li>
            <li className={style.total}>
              <span>共1晚</span>
            </li>
            <li>
              <span>离店</span>
              <EndTime/>
            </li>
          </ul>
          <div className={style.search} onClick = { () => browserHistory.push(`/hotel/search?channel=${channelCode}`)}>
            <span>{keyWord || '关键字/酒店/地址'}</span>
          </div>
          <div className={classnames(style.search,style.last)}
               onClick={() => toggleActive('star')}>
            <span>星级/价格</span>
          </div>
        </div>
      </div>
    )
  }
}
export default Main
