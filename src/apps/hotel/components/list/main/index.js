// @flow
import React, { PropTypes,Component } from 'react'
import style from './style.css'
import {browserHistory} from 'react-router'
import classnames from 'classnames'
class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
      itemNodes:[]
    }
  }
  searchWord(channel){
    browserHistory.push(`/hotel/search?channel=${channel}`)
  }
  render(){
    const { data,channel , pageIndex } = this.props
    let itemNodes
    if(pageIndex==2){
      itemNodes = []
      if(data.hotels) {itemNodes.push(data.hotels.map((item,index) => <ListItem key = {index} channel = {channel} data = { item }/>))}
    }else{
      if(data.hotels) {itemNodes = this.state.itemNodes; itemNodes.push(data.hotels.map((item,index) => <ListItem key = {index} channel = {channel} data = { item }/>))}
    }

    return (
      <div className={style.wrapContent}>
        <div className = {style.search}>
          <input type="search" onClick = {() => this.searchWord(channel)} className = {style.searchWord} placeholder="酒店名/商圈/地标等"/>
        </div>
        <ul className={style.list}>
          {itemNodes}
        </ul>
      </div>
    )
  }
}

const ListItem = ({data,channel}) => {
  return (
    <li className={style.item} onClick = { () => browserHistory.push(`/hotel/detail/${data.id}?channel=${channel}`) }>
      <img className={style.pic} src={data.pic}/>
      <div className={style.listCont}>
        <h4>{data.name}</h4>
        <div className={style.infoList}>
          <div className={style.info}>
            <strong>{data.type}</strong><span>推荐度{data.recommend}</span>
            <p><span>{data.districtName}</span><span>{data.landmark}</span></p>
            <span>{data.distance}</span>
          </div>
          <div className={style.price}>
            <strong><i>￥</i>{data.price.toFixed(1)}</strong><span>起</span>
          </div>
        </div>
      </div>
    </li>
  )
}
export default Main
