// @flow
import React from 'react'
import { browserHistory } from 'react-router'
import localStyle from './style.css'
import { moment } from 'libs/utils'
import classnames from 'classnames'
import { Button } from '@boluome/blm-web-components'

const Header = ({date, time, type, seatNo, filmName, cinema, plan, pic}) => {
    return (
        <header className = { localStyle.header }>
            <div className = { localStyle.text }>
                <span className = { localStyle.row }>{filmName}</span>
                <span className = { localStyle.row }>{cinema.name}</span>
                <span className = { localStyle.row }>
                  <span>{ new moment(date).format('MM月DD日') }</span>
                  <span>{ new moment(date).format('day') }</span>
                  <span>{ time }</span>

                </span>
                <span className = { localStyle.row }>
                  <span>{ type }</span>
                  <span>{ plan.hallName }</span>
                </span>
                <span className = { localStyle.row }>{seatNo.map((ele, idx) => <span key = {idx}>{ele.seatRow}排{ele.seatCol}座&nbsp;&nbsp;&nbsp;</span>)}</span>
            </div>
            <div>
                <img className = { localStyle.img } src = {pic} />
            </div>
        </header>
    )
}

export default Header
