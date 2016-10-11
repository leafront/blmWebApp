// @flow
import React, { PropTypes,Component } from 'react'
import style from './style.css'
import { browserHistory } from 'react-router'
import classnames from 'classnames'
const Main = ({data,channel}) => {
  return (
    <div className={style.wrapContent}>
      <ul className={style.list}>
        {itemNodes}
      </ul>
    </div>
  )
}

export default Main
