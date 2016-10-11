// @flow
import React, { PropTypes } from 'react'
import style from './style.css'
import classnames from 'classnames'

const Main = (props) => {
    return (
        <main className = { style.main }>
            <div className = { style.wrap }>
                <section className = { classnames(style.row, style.between) }>
                    <span>配送日期</span>
                    <span className = { style.last }> 0.0</span>
                </section>
                <section className = { classnames(style.row, style.between) }>
                    <span>红包优惠</span>
                    <span className = { style.last }>-￥0.0</span>
                </section>
                <section className = { classnames(style.row, style.between) }>
                    <span>发票抬头</span>
                    <span className = { style.last }>-￥0.0</span>
                </section>
            </div>
            <div className = { style.wrap }>
                <section className = { classnames(style.row, style.between) }>
                    <span>商品1</span>
                    <span className = { style.last }> 0.0</span>
                </section>
                <section className = { classnames(style.row, style.between) }>
                    <span>商品2</span>
                    <span className = { style.last }>-￥0.0</span>
                </section>
            </div>
            <div className = { style.wrap }>
                <section className = { classnames(style.row, style.between) }>
                    <span>商品总额</span>
                    <span className = { style.last }> 0.0</span>
                </section>
                <section className = { classnames(style.row, style.between) }>
                    <span>运费</span>
                    <span className = { style.last }>-￥0.0</span>
                </section>
                <section className = { classnames(style.row, style.between) }>
                    <span>红包抵扣</span>
                    <span className = { style.last }>-￥0.0</span>
                </section>
            </div>
        </main>
    )
}

export default Main
