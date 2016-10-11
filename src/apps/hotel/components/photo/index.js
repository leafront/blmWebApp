// @flow
import React, { PropTypes,Component } from 'react'
import style from './style.css'
import classnames from 'classnames'
import ReactSwipe from 'react-swipe'
class Photo extends Component{
  constructor(props){
    super(props)
  }
  slideToggle(index){
    this.refs.reactSwipe.slide(index,'0')
  }
  render (){
    const { data, toggleActive , active } = this.props
    const picList=data.map((item,index)=>
      <li key = { index } onClick = { () => {this.slideToggle(index);toggleActive('picPopup')}}><img src = { item }/></li>
    )
    const sliderPic = data.map((item,index) =>
      <div key = { index } className = {style.slider}><img src = { item }/></div>
    )
    return (
      <div className = {style.photoWrap}>
        <ul className = {style.photoList}>
          {picList}
        </ul>
        <div className = {classnames(style.picPopup,active == 'picPopup' ? style.active :'')} onClick ={ () => toggleActive('')}>
        <ReactSwipe ref="reactSwipe" className={style.carousel} swipeOptions={{continuous: true,startSlide:0}}>{sliderPic}</ReactSwipe>
        </div>
      </div>
    )
  }
}
export default Photo
