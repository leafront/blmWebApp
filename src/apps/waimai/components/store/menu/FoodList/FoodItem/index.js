import React from 'react'
import request from 'superagent'
import style from './style.css'
import addGreen from '../../../../../images/add_green.svg'
import substractGreen from '../../../../../images/substract_green.svg'

export default class FoodItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    _click(id, name, price, mothed) {
        const { onSelectFood, onCount } = this.props
        onSelectFood(id, name, price, mothed)
        onCount(mothed)
    }
    render() {
        const { data } = this.props
        return (
            <li className = {style.item}>
              <div className = {style.wrap}>
                <div className = {style.left}>
                  <img src = {data.pic} className = {style.pic} alt = '单品图片' />
                </div>
                <div className = {style.right}>
                  <section className = {style.row}>
                    <span className = {style.name}>{data.name}</span>
                  </section>
                  <section className = {style.row}>
                    <span><span className = {style.price}>{data.rating}</span> 月售{data.sales}单</span>
                    <span>
                        { data.count ? <img className = {style.substract} onClick = {this._click.bind(this, data.id, data.name, data.price, 'substract')} src = {substractGreen} alt = '添加' /> : '' }
                        { data.count ? <span className = {style.count}>{data.count}</span> : ''}
                        <img className = {style.add} onClick = {this._click.bind(this, data.id, data.name, data.price, 'add')} src = {addGreen} alt = '添加' />
                    </span>
                  </section>
                  <section className = {style.row}>
                    <span className = {style.price}>￥{data.price}</span>
                  </section>
                </div>
              </div>
            </li>
        )
    }
}
