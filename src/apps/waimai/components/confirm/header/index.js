// @flow
import React from 'react'
import { browserHistory } from 'react-router'
import style from './style.css'
import classnames from 'classnames'
import { Button } from '@boluome/blm-web-components'

const Header = (props) => {
    return (
        <header className = { style.header }>
            添加收货地址
        </header>
    )
}

export default Header
