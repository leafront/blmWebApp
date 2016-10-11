// @flow
import React, { PropTypes } from 'react'
import style from './style.css'
import classnames from 'classnames'
import imgFilter from '../../../images/filter.png'
import imgLocation from '../../../images/currentLocation.png'
import imgPrice from '../../../images/price.png'
import imgSort from '../../../images/sort.png'
const Footer = ({  channel , storeInfo ,toggleActive , getLocationData , getFilterData }) => {
  const cityId = storeInfo.cityId
  return (
    <footer className={style.footer}>
      <ul className={style.footList}>
        <li onClick = { () =>{ toggleActive('filter');getFilterData(channel)}}>
          <img src = {imgFilter}/>
          <span>综合筛选</span>
        </li>
        <li onClick = { () =>{ toggleActive('location');getLocationData(channel,cityId)}}>
            <img src = {imgLocation}/>
          <span>区域位置</span>
        </li>
        <li onClick = { () => toggleActive('star')}>
          <img src = {imgPrice}/>
          <span>星级/价格</span>
        </li>
        <li onClick = { () => toggleActive('sort')}>
          <img src = {imgSort}/>
          <span>排序</span>
        </li>
      </ul>
    </footer>
  )
}
export default Footer
