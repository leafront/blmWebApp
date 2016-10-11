// @flow
import React from 'react'
import localStyle from './styles.css'
// import classnames from 'classnames'
import { Icon } from '@boluome/blm-web-components'

const OrderStatus = (props) => {
    return (
        <div className={localStyle.bottom}>
            <div className={localStyle.bottom1}>全程约{props.distance}</div>
            <div className={localStyle.bottom1}>
                <p className={localStyle.bottomP}>出发时间 {props.time}</p>
                <p className={localStyle.bottomP}>上车点 {props.start}</p>
                <p className={localStyle.bottomP}>目的地 {props.end}</p>
            </div>
            <div className={localStyle.bottom2}>由 {props.channel === 'didi' ? '滴滴' : '易到'} 为您贴心服务</div>
        </div>
    )
}

export default OrderStatus
