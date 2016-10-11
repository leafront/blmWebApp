// @ flow
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { toggleActive } from '../actions/common'
import { getPhotoList } from '../actions/photoList'
import Photo from '../components/photo'
import { Tabbar } from '@boluome/blm-web-components'
class PhotoList extends Component {
    constructor (props){
      super(props)
      this.state = {
        currentIndex:0
      }
    }
    componentWillMount() {
        document.title = '酒店相册'
        const { location , getPhotoList , params , id , data } = this.props
        const hotelId = params.hotelId
        const channel = location.query.chnnel
        if(id!==hotelId && hotelId) getPhotoList(channel,hotelId)
    }
    render() {
        const { active , toggleActive , data } = this.props
        let titleList =[];
        data.forEach((item) => {
          for(var attr in item){
            if(attr=="group"){
              titleList.push(item[attr])
            }
          }
        })
        const content = data.map((imtem,index) =>
          <Photo key = {index} data = {data[index].images} active = { active } toggleActive = { (arg) => toggleActive(arg) }/>,
        )
        return (
          <div>
            <Tabbar type = 'basic'
                    tabs = {titleList}
                    contents = { content }
                    style = {{'background':'#fff'}}
                    current = {this.state.currentIndex}
                    onTabClick = { idx => this.setState({currentIndex: idx }) } />
          </div>
        )
    }
}
PhotoList.proptypes={
  active:PropTypes.string.isRequired,
  data:PropTypes.array.isRequired,
  id:PropTypes.array.isRequired
}
function mapStateToProps(state) {
  return {
    active:state.common.active,
    data:state.photoList.data,
    id:state.photoList.id
  }
}
function mapDispatchToProps(dispatch) {
  return {
    toggleActive: (arg) => dispatch(toggleActive(arg)),
    getPhotoList: (arg1,arg2) => dispatch(getPhotoList(arg1,arg2))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoList)
