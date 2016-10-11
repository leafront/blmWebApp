// @flow
import React, { PropTypes } from 'react'
import { browserHistory } from 'react-router'
import style from './style.css'

const Cart = ({ foods }) => {
	return <div className = {style.cart} onClick = {() => browserHistory.push(`/shengxian/cart`) }><span>购物车</span></div>
}

// Cart.propTypes = { foods: PropTypes.array.isRequired }

export default Cart
