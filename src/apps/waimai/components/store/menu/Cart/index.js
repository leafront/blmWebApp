import React from 'react'
import request from 'superagent'
import classnames from 'classnames'
import style from './style.css'
import cartIcon from '../../../../images/cart.svg'

export default class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showDetail: false
        }
    }
    _confirm(e) {
      e.stopPropagation()
      if (!this.props.num) return false
      const user = JSON.parse(localStorage.user || null)
      !user ? this.props.onLogin() : this.props.onConfirm()
    }
    render() {
        let FoodNodes = this.props.sfoods.map((item, idx) => {
              return (
                    <tr className = {style.tr} key={idx}>
                        <td className = {style.tdLeft} width = "70%">{item.name}</td>
                        <td className = {style.td} width = "15%">￥{item.price}</td>
                        <td className = {style.td} width = "15%">×{item.quantity}</td>
                    </tr>
              )
        })
        return (
            <div className = {style.cart} onClick = {() => this.setState({showDetail: !this.state.showDetail})}>
                <table className = {style.detail} width="100%">
                    <tbody>
                        {this.state.showDetail ? FoodNodes : ''}
                    </tbody>
                </table>
                <div className = {classnames(style.bottom, 'row')}>
                  <span className = {style.overview}><img className = {style.cartIcon} src = {cartIcon} alt = '' />{this.props.num} 份 ￥{this.props.total ? this.props.total : '0'} </span>
                  <span className = {classnames(style.submit, !this.props.num ? 'btn-disabled': '')} onClick = {this._confirm.bind(this)}>确认美食</span>
                </div>
            </div>
        )
    }
}
