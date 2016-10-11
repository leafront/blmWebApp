// @ flow
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getIntroduceData } from '../actions/introduce'
import Main from '../components/introduce'
import { Loading } from '@boluome/blm-web-components'
class Introduce extends Component {
    componentWillMount() {
        document.title = '酒店介绍'
        const { location , params , hotelId ,getIntroduceData } = this.props
        const channel = location.query.channel
        const id = params.hotelId
        if(hotelId!== id && id)getIntroduceData(channel,id)
    }
    render() {
        const { data , loading } = this.props
        return (
            <div>
              {
                loading ?  <Loading style = {{height: '100%'}}></Loading>
                : <Main data = { data }></Main>
              }
            </div>
        )
    }
}
Introduce.propTypes = {
    data:PropTypes.object.isRequired,
    loading:PropTypes.bool.isRequired,
    hotelId:PropTypes.string.isRequired
}
function mapStateToProps(state) {
  return {
    data:state.introduce.data,
    loading:state.introduce.loading,
    hotelId:state.introduce.hotelId
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getIntroduceData: (channel,hotelId) => dispatch(getIntroduceData(channel,hotelId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Introduce)
