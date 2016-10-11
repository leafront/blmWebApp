// @flow
import React from 'react'
// import { browserHistory } from 'react-router'
import localStyle from './style.css'
import classnames from 'classnames'
// import { Icon } from '@boluome/blm-web-components'

const Header = ({filmName, cinemaName, date, time ,type}) => {
    return (
        <div className = { localStyle.header }>
            <span>{filmName}</span>
            <span className = { localStyle.extra }>{cinemaName}</span>
            <div className = { localStyle.extra }><span>{date}</span><span className = { localStyle.span }>{time}</span><span className = { localStyle.span }>{type}</span></div>
        </div>
    )
}

export default Header
