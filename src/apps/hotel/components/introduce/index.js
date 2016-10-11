// @flow
import React, { PropTypes,Component } from 'react'
import style from './style.css'
import classnames from 'classnames'
const Main = ({data}) => {
  return (
      <div className = {style.introduce}>
        <h4>{data.name}</h4>
        <ul className = {style.introList}>
          <li><span>联系电话</span><p>{data.tel}</p></li>
          <li><span>酒店地址</span><p>{data.address}</p></li>
          <li><span>酒店介绍</span><p>{data.intro || '无'}</p></li>
        </ul>
      </div>
  )
}
export default Main
