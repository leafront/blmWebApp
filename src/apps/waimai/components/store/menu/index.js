import React from 'react'
import request from 'superagent'
import CateList from './CateList'
import FoodList from './FoodList'
import Cart from './Cart'
import { Loading } from '@boluome/blm-web-components'
import classnames from 'classnames'
import style from './style.css'

export default class Menu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            cateIdx: 0,
            foods: [],
            sfoods: []
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.storeId !== this.props.storeId) this.fetchData(nextProps.storeId)
    }
    componentDidMount() {
        this.fetchData(this.props.storeId)
    }
    fetchData(storeId) {
        request
        .get(HOST + '/waimai/v1/restaurant/menus?supplier=' + 'ele' + '&restaurant_id=' + storeId)
        .end((err, res) => {
            if (!err && res.statusCode == 200) {
                if (res.body.code != 0) return alert(res.body.message)
                this.setState({
                  data: res.body.data,
                  foods: res.body.data[0].foods
                })
            } else {
                alert('请确认网络状况')
            }
        })
    }
    _count(mothed, foodIdx) {
        let n = this.state.data
        const { cateIdx } = this.state
        // 先给当前分类 +- 1
        if (!n[cateIdx].count) {
            if (mothed !== 'add') return false
            n[cateIdx].count = 1
        } else {
            n[cateIdx].count = mothed === 'add' ? n[cateIdx].count + 1 : n[cateIdx].count - 1
        }
        // 再给当前菜品 +- 1
        if (!n[cateIdx].foods[foodIdx].count) {
            if (mothed !== 'add') return false
            n[cateIdx].foods[foodIdx].count = 1
        } else {
            n[cateIdx].foods[foodIdx].count = mothed === 'add' ? n[cateIdx].foods[foodIdx].count + 1 : n[cateIdx].foods[foodIdx].count - 1
        }
        this.setState({ data: n })
    }
    render() {
        const { onSelectFood, onSelectCate, sfoods, num, total, onLogin, onConfirm, hidden } = this.props
        return (
            <div className = {classnames(style.menu, hidden ? 'hidden': '')}>
              <div className = {style.content}>
                {this.state.foods.length === 0 ? <div className={style.wrap}><Loading /></div>: ''}
                <div className = {classnames(style.side, style.left)}>
                  <CateList cates = {this.state.data} selected = {this.state.cateIdx} onSelectCate = {(idx) => {
                      this.setState({cateIdx: idx})
                      this.setState({foods: this.state.data[idx].foods})
                    }} />
                </div>
                <div className = {classnames(style.side, style.right)}>
                  <FoodList foods = {this.state.foods} onSelectFood = {(id, name, price, mothed) => onSelectFood(id, name, price, mothed)} onCount = {(mothed, foodIdx) => this._count(mothed, foodIdx)} />
                </div>
              </div>
              <Cart sfoods = {sfoods} num = {num} total = {total} onLogin = {() => onLogin()} onConfirm = { () => onConfirm() } />
            </div>
        )
    }
}
