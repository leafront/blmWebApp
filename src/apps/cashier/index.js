import React, { Component } from 'react'
import request from 'superagent'
import { createPayment } from 'libs/pay'
import style from './style.css'
import { Button, Loading } from '@boluome/blm-web-components'
import alipay from '../../images/alipay.png'
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            payinfo: {},
            payChannel: 'alipay_wap'
        }
    }
    componentWillMount() {
        document.title = '收银台'
        const { orderId } = this.props.params
        request.get(`${window.$config.HOST}/basis/v1/order/${orderId}/payInfo`).end((err, res) => {
            if (!err && res.statusCode === 200) {
                if (res.body.code !== 0) return alert(JSON.stringify(res.body.message))
                this.setState({ payinfo: res.body.data })
            } else {
                alert('网络状况不好')
            }
        })
    }
    getCharge() {
        const {name, price} = this.state.payinfo
        const { orderId } = this.props.params
        request.post(`${window.$config.HOST}/payment/v1/charge`, {
            amount: price,
            id: orderId,
            channel: this.state.payChannel,
            subject: name,
            body: name,
            extra: {
                success_url: 'http://boluome.com'
            }
        }).set('Authorization', 'f225a9a9e46dd2b4602fd466adb7054e')
        .set('ID', 'blm001')
        .end((err, res) => {
            if (!err && res.statusCode === 200) {
                if (res.body.code !== 0) return alert(JSON.stringify(res.body.message))
                this.toPay(res.body.data)
            } else {
                alert('网络状况不好')
            }
        })
    }
    toPay(charge) {
        createPayment(charge, (result, err) => {
            if (result == "success") {
            // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
            } else if (result == "fail") {
                // charge 不正确或者微信公众账号支付失败时会在此处返回
            } else if (result == "cancel") {
                // 微信公众账号支付取消支付
            }
        })
    }
    render() {
        const {name, price} = this.state.payinfo
        return (
          <div className = {style.main}>
              { !name ? <Loading /> :
                  <div>
                      <div className = {style.wrap}>
                          <span>{name}</span>
                          <span>应付金额：<strong>￥{price}</strong></span>
                      </div>
                      <div className = {style.wrap}>
                          <input type='radio' checked style={{ float: 'right', position: 'relative', top: '16px' }} />
                          <span><img src={ alipay } width='24px' style={{ position: 'relative', top: '5px', marginRight: '10px' }}/>支付宝</span>
                      </div>
                      <div className = {style.btnWrap}>
                          <Button type = 'primary' className = {style.btn} title = '立即付款' onClick = {() => this.getCharge()} />
                      </div>
                  </div>
              }
          </div>
        )
    }
}
//<span style = {{color: '#e7e7e7'}}>微信支付</span>

export default App
