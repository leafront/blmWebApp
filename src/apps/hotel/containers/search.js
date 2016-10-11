// @ flow
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { getBrandList , getLocationList } from '../actions/search'
import Main from '../components/search/main'
import { Loading } from '@boluome/blm-web-components'
class Search extends Component {
    componentWillMount() {
        document.title = '搜索酒店'
        const { getBrandList , location , getLocationList } = this.props
        const channel = location.query.channel
        getBrandList(channel)
        getLocationList(channel)
    }
    render() {
        const { brandData , locationData , loading } = this.props
        return (
            <div>
            {
              loading?
              <Loading style = {{height: 'calc(100% - 50px)'}}>
              </Loading>:<Main brandData = { brandData } locationData = { locationData }></Main>
            }
            </div>
        )
    }
}
Search.propTypes = {
  brandData:PropTypes.object.isRequired,
  locationData:PropTypes.object.isRequired,
  loading:PropTypes.bool.isRequired
}
function mapStateToProps(state) {
  return {
    brandData:state.search.brandData,
    locationData:state.search.locationData,
    loading:state.search.loading
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getBrandList: (channel) => dispatch(getBrandList(channel)),
    getLocationList: (channel) => dispatch(getLocationList(channel))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Search)
