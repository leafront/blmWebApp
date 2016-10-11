// @ flow
import React, { Component , PropTypes } from 'react'
import { connect } from 'react-redux'
import { getHotelData , getFilterData , getLocationData } from '../actions/list'
import { toggleActive , getHotelInfo } from '../actions/common'
import Main from '../components/list/main'
import Footer from '../components/list/footer'
import Filter from '../components/list/filter'
import Location from '../components/list/location'
import StarPrice from '../components/common/starPrice'
import Sort from '../components/list/Sort'
import { Loading } from '@boluome/blm-web-components'
class List extends Component {
    constructor(props){
      super(props)
      this.state = {
        page:1
      }
      this.storeInfo = JSON.parse(localStorage.getItem('HOTEL_INFO'))
    }
    componentWillMount() {
      document.title = '酒店列表'
      this.listData()
    }
    listData(){
      const { getHotelData , getCityId , location , hotelInfo } = this.props
      const searchKey = location.query
      const channel = searchKey.channel
      const queryText = searchKey.QueryText || ""
      let page = this.state.page
      getHotelData({
        PageIndex:page,
        DistanceType:this.storeInfo.DistanceType,
        DepartureDate:this.storeInfo.endTime,
        channel: channel,
        PageSize: 20,
        BrandId:this.storeInfo.BrandId || hotelInfo.BrandId,
        DistrictId:this.storeInfo.DistrictId || hotelInfo.DistrictId,
        Zone:this.storeInfo.Zone || hotelInfo.Zone,
        QueryText:queryText,
        ArrivalDate:this.storeInfo.startTime,
        StarRate:hotelInfo.StarRate,
        CityId: this.storeInfo.cityId,
        LowRate:hotelInfo.LowRate,
        HighRate:hotelInfo.HighRate,
        Facilities:hotelInfo.Facilities,
        ThemeIds:hotelInfo.ThemeIds,
        lng:this.storeInfo.lng,
        lat:this.storeInfo.lat
      })
      page++
      this.setState({page:page})
    }
    componentDidMount(){
      window.onscroll = this.scrollLoad()
    }
    scrollLoad(){
      const viewPortHeight = window.innerHeight
      return this.throttle(()=>{
        const winHeight = document.documentElement.offsetHeight
        const offsetDistance = 40
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
        if(viewPortHeight+scrollTop+40>=winHeight){
          this.listData()
        }
      },100,200)
    }
    componentWillUnmount(){
      window.onscroll = null
    }
    throttle(func, wait, mustRun) {
    	var timeout,
    	startTime = new Date();
    	return function() {
    		var context = this,
    			args = arguments,
    			curTime = new Date();

    		clearTimeout(timeout);
    		// 如果达到了规定的触发时间间隔，触发 handler
    		if(curTime - startTime >= mustRun){
    			func.apply(context,args);
    			startTime = curTime;
    		// 没达到触发间隔，重新设定定时器
    		}else{
    			timeout = setTimeout(func, wait);
    		}
    	};
    }
    render() {
        const { data ,location , getHotelData , getFilterData , getHotelInfo , hotelInfo , loading , locationData , getLocationData , filterData , toggleActive , active } = this.props
        const searchKey = location.query
        const channel = searchKey.channel
        const pageIndex = this.state.page
        return (
            <div>
              {
                loading == true ?
                <Loading style = {{height: 'calc(100% - 50px)'}}>
                </Loading>:<Main data = { data } pageIndex = {pageIndex} channel = { channel }/>
              }
              <Footer channel = { channel }
                storeInfo = {this.storeInfo}
                toggleActive = {(arg) => toggleActive(arg)}
                getLocationData ={ (channel,cityId) => getLocationData(channel,cityId)}
                getFilterData = { (channel) => getFilterData(channel) }>
              </Footer>
              <Filter
                  searchKey = { searchKey }
                  hotelInfo = { hotelInfo }
                  storeInfo = {this.storeInfo}
                  getHotelInfo = {(type,id) => getHotelInfo(type,id)}
                  filterData = {filterData}
                  toggleActive = { (arg) => toggleActive(arg)}
                  channel = { channel }
                  getHotelData = {(arg) => getHotelData(arg)}
                  active = { active }>
                </Filter>
              <Location
                  searchKey = { searchKey }
                  hotelInfo = { hotelInfo }
                  storeInfo = {this.storeInfo}
                  getHotelInfo = {(type,id) => getHotelInfo(type,id)}
                  locationData = {locationData}
                  toggleActive = { (arg) => toggleActive(arg)}
                  channel = { channel }
                  getHotelData = {(arg) => getHotelData(arg)}
                  active = { active }>
                </Location>
              <StarPrice
                searchKey = { searchKey }
                storeInfo = {this.storeInfo}
                getHotelData = {(arg) => getHotelData(arg)}
                page = {'list'}
                channel = {channel}
                hotelInfo = {hotelInfo}
                toggleActive = {(arg) => toggleActive(arg)}
                getHotelInfo = {(type,id) => getHotelInfo(type,id)}
               active={active}></StarPrice>
              <Sort
                searchKey = { searchKey }
                channel = {channel}
                storeInfo = {this.storeInfo}
                hotelInfo = {hotelInfo}
                getHotelData = {(arg) => getHotelData(arg)}
                getHotelInfo = {(type,id) => getHotelInfo(type,id)}
                active = {active}
                toggleActive = { (arg) => toggleActive(arg)}></Sort>
            </div>
        )
    }
}


List.propTypes = {
    data: PropTypes.object.isRequired,
    active: PropTypes.string.isRequired,
    filterData: PropTypes.object.isRequired,
    locationData:PropTypes.object.isRequired,
    hotelInfo:PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
      data:state.list.data,
      filterData:state.list.filterData,
      locationData:state.list.locationData,
      active: state.common.active,
      loading:state.list.loading,
      hotelInfo:state.common.hotelInfo
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getHotelData: (params) => dispatch(getHotelData(params)),
        getFilterData: (channel) => dispatch(getFilterData(channel)),
        getLocationData: (channel,cityId) => dispatch(getLocationData(channel,cityId)),
        toggleActive: (arg) => dispatch(toggleActive(arg)),
        getHotelInfo: (type,id) => dispatch(getHotelInfo(type,id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
