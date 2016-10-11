// @flow
import React from 'react'
import { browserHistory } from 'react-router'
import localStyle from './styles.css'
import { Icon } from '@boluome/blm-web-components'

const OrderHeader = (props) => {
    return (
        <header className={localStyle.header}>
            <a onClick={() => browserHistory.goBack()} className={localStyle.headerPosition}>
                <Icon type='arrow_back' />
            </a>
            我的行程
        </header>
    )
}

export default OrderHeader
