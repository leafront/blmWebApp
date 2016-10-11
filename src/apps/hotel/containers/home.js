// @ flow
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { toggleActive , getHotelInfo } from '../actions/common'
import { getChannel , tabChannel , getLocationData , setCity } from '../actions/index'
import Main from '../components/home/main'
import StarPrice from '../components/common/starPrice'
import { Button } from '@boluome/blm-web-components'
import style from '../components/home/main/style.css'
class Home extends Component {
    constructor(props){
      super(props)
      this.hotelInfo = JSON.parse(localStorage.getItem('HOTEL_INFO')) || {}
    }
    componentWillMount() {
        document.title = '选择酒店'
        const { getChannel , getLocationData  , channelCode , setCity } = this.props
        getLocationData(channelCode)
    }
    queryString (dataObject){
      let convertedString = ''
      for(let i = 0; i < Object.keys(dataObject).length; i++){
        if(i > 0) {
          convertedString += '&'
        }
        convertedString += (Object.keys(dataObject)[i] + '=' + dataObject[Object.keys(dataObject)[i]])
      }
      return convertedString
    }
    render() {
        let { toggleActive,active,location , getHotelData , setCity , getHotelInfo , hotelInfo , getLocationData ,tabChannel , address , channelCode , index } = this.props
        address = this.hotelInfo.address || address
        const getChannel =  [{
            "icon": null,
            "name": "去哪儿",
            "code": "qunar",
            "angle": ""
        },
        {
            "icon": "http://te.boluomeet.com/static/brand_icon/ic_pinpai_xiecheng.png",
            "name": "携程",
            "code": "ctrip",
            "angle": ""
        },
        {
            "icon": "http://te.boluomeet.com/static/brand_icon/ic_pinpai_elong.png",
            "name": "艺龙",
            "code": "elong",
            "angle": ""
        }]
        const query = this.queryString(location.query)==''?'':'&'+this.queryString(location.query)
        const keyWord = location.query.QueryText
        return (
            <div className={style.list}>
              <Main
                setCity = {(city) => setCity(city)}
                getChannel = { getChannel }
                channelCode = {channelCode}
                address = {address}
                index = {index}
                getLocationData = {(channelCode) => getLocationData(channelCode)}
                keyWord = { keyWord }
                tabChannel = {(code,index) => tabChannel(code,index)}
                toggleActive = {(arg) => toggleActive(arg)}>
              </Main>
              <Button type = 'primary' title = '查找酒店' style={{width:'100%',marginTop:30}}
              onClick = { () => browserHistory.push(`/hotel/list?channel=${channelCode}${query}`) } />
              <StarPrice
                storeInfo = {null}
                getHotelData = {(arg) => getHotelData(arg)}
                page = {'index'}
                channel = {channelCode}
                hotelInfo = {hotelInfo}
                toggleActive = {(arg) => toggleActive(arg)}
                getHotelInfo = {(type,id) => getHotelInfo(type,id)}
               active={active}></StarPrice>
            </div>
        )
    }
}
Home.propTypes = {
    active:PropTypes.string.isRequired,
    channelCode:PropTypes.string.isRequired,
    index:PropTypes.number.isRequired,
    hotelInfo:PropTypes.object.isRequired,
    city:PropTypes.object.isRequired
}
function mapStateToProps(state) {
  return {
      active: state.common.active,
      getChannel:state.home.getChannel,
      channelCode:state.home.channelCode,
      index:state.home.index,
      address:state.home.address,
      hotelInfo:state.common.hotelInfo,
      city:state.home.city
  }
}
function mapDispatchToProps(dispatch) {
  return {
      toggleActive: (arg) => dispatch(toggleActive(arg)),
      getChannel: () => dispatch(getChannel()),
      tabChannel: (code,index) => dispatch(tabChannel(code,index)),
      getLocationData: (channel) => dispatch(getLocationData(channel)),
      getHotelInfo: (type,id) => dispatch(getHotelInfo(type,id)),
      setCity: (city) => dispatch(setCity(city))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
