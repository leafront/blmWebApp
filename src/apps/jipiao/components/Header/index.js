// @flow
import React from 'react'
import { browserHistory } from 'react-router'
import localStyle from './styles.css'
import { Icon } from '@boluome/blm-web-components'

const Header = (props) => {
    return (
        <header className={localStyle.header} style={props.styles}>
            <div className={localStyle.headerPosition}>
                <Icon type='arrow_back' size={16} onClick={() => browserHistory.goBack()} />
            </div>
            {props.title}
        </header>
    )
}

export default Header
