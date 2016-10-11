// @flow
import React from 'react'
import localStyle from './style.css'

const Footer = ({total, phone, confirmOrder}) => {
    return (
        <footer className = { localStyle.footer }>
            <span className = { localStyle.total }>￥{total || 0.0}</span>
            <span className = { localStyle.confirm } onClick = {!total || !phone ? (evt) => evt.stopPropagation() : () => confirmOrder()}>立即下单</span>
        </footer>
    )
}

export default Footer
