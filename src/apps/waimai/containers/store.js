import React, {Component} from 'react'
import Tabbar from '../components/store/tabbar'
import Menu from '../components/store/menu'
import Intro from '../components/store/intro'
import classnames from 'classnames'
import findIndex from 'findIndex'
let _ = {}
_.findIndex = findIndex

export default class Store extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showMenu: true,
            sfoods: [],
            num: 0,
            total: 0,
        }
    }
    _selectFood(id, name, price, mothed) {
        let n = this.state.sfoods
        const idx = _.findIndex(n, {id: id})
        if (idx === -1) {
            if (mothed !== 'add') return false
            n.push({id: id, name: name, price: price, quantity: 1})
        } else {
            n[idx].quantity = mothed === 'add' ? n[idx].quantity + 1 : n[idx].quantity - 1 === 0 ? delete n[idx] : n[idx].quantity - 1
        }
        this.setState({ sfoods: n, num : mothed === 'add' ? this.state.num + 1 : this.state.num - 1, total: mothed === 'add' ? this.state.total + price: this.state.total - price })
    }
    _saveFood(action) {
        const sfoods = this.state.sfoods
        let food = []
        sfoods.forEach((ele, idx) => food.push({ id: ele.id, quantity: ele.quantity, garnish: [] }))
        localStorage.setItem('food', JSON.stringify(food))
        action === 'login' ? this.props.onLogin(sfoods) : this.props.onConfirm(sfoods)
    }
    render() {
        const { hidden, storeId } = this.props
        return (
            <div>
              <Tabbar showMenu = {this.state.showMenu} onSwitchTab = {(target) => target === 'menu' ? this.setState({ showMenu: true }) : this.setState({ showMenu: false })} />
              <Menu hidden = {!this.state.showMenu} storeId = {storeId} sfoods = {this.state.sfoods} num = {this.state.num} total = {this.state.total}
               onSelectFood = {(id, name, price, mothed) => this._selectFood(id, name, price, mothed)}
               onLogin = {() => this._saveFood('login')} onConfirm = {() => this._saveFood('confirm')} />
              <Intro hidden = {this.state.showMenu} storeId = {storeId} />
            </div>
        )
    }
}
