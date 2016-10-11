// @ flow
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getHotelDetail , toggleHouseList , togglePopup } from '../actions/detail'
import { toggleActive } from '../actions/common'
import Main from '../components/detail/main'
import { Loading } from '@boluome/blm-web-components'
class Detail extends Component {
    constructor(props){
      super(props)
      this.hotelInfo = JSON.parse(localStorage.getItem('HOTEL_INFO'))
    }
    componentWillMount() {
        document.title = '酒店详情'
        const { data , params, location , getHotelDetail } = this.props
        const channel = location.query.channel
        const hotelId = params.hotelId
        if(data.id!==hotelId && hotelId){
          getHotelDetail(channel,this.hotelInfo.startTime,this.hotelInfo.endTime,hotelId)
        }
    }
    render() {
      const { data , id , toggleHouseList , loading , roomId , togglePopup , location  } = this.props
      const channel=location.query.channel
        return (
            <div>
              {
                loading ?
                <Loading style = {{height: 'calc(100% - 50px)'}}>
                </Loading>:
                <Main
                  data = {data}
                  id = {id}
                  hotelInfo = {this.hotelInfo}
                  channel = { channel }
                  roomId = { roomId }
                  toggleHouseList = {(index) => toggleHouseList(index)}
                  togglePopup = { (planId) => togglePopup(planId)}>
                </Main>
              }
            </div>
        )
    }
}

Detail.propTypes = {
    data: PropTypes.object.isRequired,
    id:PropTypes.number.isRequired,
    roomId:PropTypes.number.isRequired,
    loading:PropTypes.bool.isRequired
}

function mapStateToProps(state) {
    return {
      data:state.detail.data,
      id:state.detail.id,
      roomId:state.detail.roomId,
      loading:state.detail.loading
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getHotelDetail: (arg1,arg2,arg3,arg4) => dispatch(getHotelDetail(arg1,arg2,arg3,arg4)),
        toggleHouseList:(index) => dispatch(toggleHouseList(index)),
        togglePopup:(planId) => dispatch(togglePopup(planId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
