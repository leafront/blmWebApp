import React from 'react'
import request from 'superagent'
import CateItem from './CateItem'
// import classnames from 'classnames'
import style from './style.css'

const CateList = (props) => {
    let CateNodes = props.cates.map((item, idx) => {
      return (
        <CateItem key={idx} data={item} idx={idx} selected={props.selected} onSelectCate = {(idx) => props.onSelectCate(idx)} />
      )
    })
    return (
        <ul className = {style.list}>
          {CateNodes}
        </ul>
    )
}

export default CateList
