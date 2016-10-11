import React, {Component} from 'react'
import classnames from 'classnames'
import style from './style.css'
import { browserHistory } from 'react-router'

export default class NearStores extends Component {
    componentDidMount() {
        const {getNearStores, page, channel} = this.props
        this.refs.storesList.onscroll = ({ target, offsetHeight = document.body.offsetHeight }) => {
            let { childNodes } = target
            if(target.scrollTop + offsetHeight - childNodes[1].offsetTop == childNodes[1].offsetHeight) {
                getNearStores(channel, localStorage.lon, localStorage.lat, page)
            }
        }
    }
    render() {
        const {stores} = this.props
        return (
            <div ref = 'storesList' className = {style.main}>
                <div className = {style.title}>附近商家</div>
                <StoreList stores = {stores} onEnterStore = {(id, name, pay, invoice) => browserHistory.push(`/waimai/restaurants/${id}`)} />
            </div>
        )
    }
}

const StoreList = ({stores, onEnterStore}) => {
  const StoreNodes = stores.map((item, idx) => {
    return (
      <StoreItem key = {idx} store = {item} onEnterStore = {(id, name, pay, invoice) => onEnterStore(id, name, pay, invoice)} />
    )
  })
  return (
    <div className = {style.list}>
      {StoreNodes}
      <span className = {style.more}>正在加载…</span>
    </div>
  )
}


const StoreItem = ({store, onEnterStore}) => {
    const { isOpen, isBookable, isOnlinePaid, restaurantId, restaurantName, pic, deliveryAmount, rating, sales, agentFee, deliverySpent, displayDistance, invoice } = store
    return (
      <li className = {classnames(style.item, isBookable === 1 ? '' : 'hidden')} onClick = {() => onEnterStore(restaurantId, restaurantName, isOnlinePaid, invoice)}>
        <div className = {style.wrap}>
          <div className = {style.left}>
            <img src = {pic} className = {style.pic} alt = '商家图片' />
          </div>
          <div className = {style.right}>
            <section className = {style.row}>
              <span className = {style.name}>{restaurantName}</span>
              <span><span className = {classnames(style.price, style.price1)}>￥{deliveryAmount}</span> 起送</span>
            </section>
            <section className = {style.row}>
              <span><span className = {style.price}>{rating}</span> 月售{sales}单</span>
              <span><span className = {style.price}>￥{agentFee}</span> 配送费</span>
            </section>
            <section className = {style.row}>
                { isOpen === 1 ?
                    <span>{deliverySpent}分钟 / {displayDistance}</span> :
                    <span className = {style.price}>休息中</span>
                }
                <span>{isOnlinePaid !== 2 ? <span className = {style.flag}>付</span> : ''}{invoice === 1 ? <span className = {style.flag}>票</span> : ''}</span>
            </section>
          </div>
        </div>
      </li>
    )
}
