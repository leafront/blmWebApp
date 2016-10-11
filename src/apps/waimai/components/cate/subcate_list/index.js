import React from 'react'
import classnames from 'classnames'
import style from './style.css'

const SubcateList = ({subcates, current, onSelectSubcate}) => {
    const SubcateNodes = subcates.map((item, idx) => <SubcateItem key={idx} subcate={item} idx={idx} current={current} onSelectSubcate = {(idx, idList) => onSelectSubcate(idx, idList)} />)
    return (
        <div className = {style.content}>
            <div className = {classnames(style.side, style.left)}>
                <ul className = {style.list}>{SubcateNodes}</ul>
            </div>
            <div className = {classnames(style.side, style.right)}>
                <GoodsList goods = {[1,2,3,4]} onSelectGoods = {() => console.log('select goods')} onCount = {() => console.log('count')} />
            </div>
        </div>
    )
}

const SubcateItem = ({current, subcate, onSelectSubcate, idx}) => {
    return (
        <li className = {classnames(style.item, current === idx ? style.selected : '')} onClick = {() => onSelectSubcate(idx, subcate.idList)}>
            {subcate.name}
        </li>
    )
}

const GoodsList = ({goods, onSelectGoods, onCount}) => {
    const GoodsNodes = goods.map((item, idx) => {
        return (
            <GoodsItem key={idx} goods={item} onSelectGoods = {(id, name, price, mothed) => onSelectGoods(id, name, price, mothed)} onCount = {(mothed) => onCount(mothed, idx)} />
        )
    })
    return (
        <ul className = {style.list}>
            {GoodsNodes}
        </ul>
    )
}

const GoodsItem = ({goods, onSelectGoods, onCount}) => {
    return (
        <li className = {style.goods}>
          <div className = {style.wrap}>
            <div className = {style.left}>
              <img src = {goods.pic} className = {style.pic} alt = '单品图片' />
            </div>
            <div className = {style.right}>
              <section className = {style.row}>
                <span className = {style.name}>{goods.name}</span>
              </section>
              <section className = {style.row}>
                <span><span className = {style.price}>{goods.rating}</span> 月售{goods.sales}单</span>
                <span>
                    { goods.count ? <img className = {style.substract} onClick = {() => onCount(this, goods.id, goods.name, goods.price, 'substract')} src = '' alt = '添加' /> : '' }
                    { goods.count ? <span className = {style.count}>{goods.count}</span> : ''}
                    <img className = {style.add} onClick = {() => onSelectGoods(goods.id, goods.name, goods.price, 'add')} src = '' alt = '添加' />
                </span>
              </section>
              <section className = {style.row}>
                <span className = {style.price}>￥{goods.price}</span>
              </section>
            </div>
          </div>
        </li>
    )
}


export default SubcateList
