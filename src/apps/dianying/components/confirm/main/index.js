// @flow
import React, { PropTypes } from 'react'
import localStyle from './style.css'
import classnames from 'classnames'

const Main = ({count, channel, phone, total, _change}) => {
    return (
        <main className = { localStyle.main }>
            <div className = { localStyle.phoneWrap }>
                <span className = { localStyle.phone }>手机号</span>
                <input value = {phone} onChange = {(evt) => _change(evt)} maxLength='11' type='tel' placeholder='请输入手机号' />
            </div>
            <div className = { localStyle.ticketWrap }>
                <section className = { localStyle.row }>{channel === 'kou' ? '抠电影': '蜘蛛网'}出票</section>
                <section className = { classnames(localStyle.row, localStyle.between) }>
                    <span>电影票</span>
                    <span>{count} 张</span>
                    <span className = { localStyle.last }>￥{total || 0.0}</span>
                </section>
                <section className = { classnames(localStyle.row, localStyle.between) }>
                    <span>红包抵扣</span>
                    <span className = { localStyle.last }>-￥0.0</span>
                </section>
                <section className = { classnames(localStyle.row, localStyle.between) }>
                    <span>活动优惠</span>
                    <span className = { localStyle.last }>-￥0.0</span>
                </section>
            </div>
        </main>
    )
}

export default Main
