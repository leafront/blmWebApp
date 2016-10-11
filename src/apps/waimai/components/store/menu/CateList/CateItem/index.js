import React from 'react'
import request from 'superagent'
import classnames from 'classnames'
import style from './style.css'

const CateItem = (props) => {
    return (
        <li className = {classnames(style.item, props.selected === props.idx ? style.selected : '')} selected={props.selected} onClick = {() => props.onSelectCate(props.idx)}>
          {props.data.name} {props.data.count ? <span className = {style.count}>{props.data.count}</span> : ''}
        </li>
    )
}

export default CateItem
