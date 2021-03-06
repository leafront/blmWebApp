// @flow
import React from 'react'
import style from './style.css'

const Footer = ({total, confirmOrder}) => {
    return (
        <footer className = { style.footer }>
            <span className = { style.total }>￥{total || 0.0}</span>
            <span className = { style.confirm } onClick = {!total ? (evt) => evt.stopPropagation() : () => confirmOrder()}>加入购物车</span>
        </footer>
    )
}

export default Footer
