'use strict'
import tools from 'tools'

class timeline {

  merge(timeline, filterLine) {
    var result = []

    timeline.forEach((item, index) => {
      let arr    = item.split(' ')
      let date   = arr[0]
      let time   = arr[1]
      let name   = arr[2]
      let reason = arr[3] || ''

      result = filterLine.map((o) => {
         if(name.indexOf(o.name) >= 0) {
           o.date    = date
           o.time    = time
           o.current = (index + 1) == timeline.length
           o.remark  = reason.length && reason || o.remark
           return o
         } else {
           return o
         }
      }).filter((st) => { return st.name })
    });
    return result
  }
  achieve(type, line, isOnlinePaid) {
    //base
    let target   = this[type]
    let mline    = []
    let lineStr  = line.join('')
    //是否已取消
    let isCancel  = (lineStr.indexOf('取消') >= 0)
    //是否已失败
    let isFail    = (lineStr.indexOf('失败') >= 0)
     //是否要退款
    let isPayback = (lineStr.indexOf('退款') >= 0)

    let merge = function(filterLine, filterCondition) {
      mline = mline.concat(this.merge(line, tools.clone(filterLine)))
      filterCondition && (mline = mline.filter(filterCondition))
    }.bind(this)

    if(typeof isOnlinePaid != 'undefined' && isOnlinePaid == 0) {
      merge(target.offline)
    } else {
      merge(target.before)
    }

    merge(target.ing)

    merge(target.success)

    isFail    && merge(target.fail || this.fail, (o) => o.date)

    isCancel  && merge(this.cancelled, (o) => o.date)

    isPayback && merge(this.pay_back)

    return mline
  }

  online  = [ status.ordered, status.be_paid, status.paid ]
  offline = [ status.ordered ]
  //话费
  huafei = {
    before : this.online,
    ing    : [ { name: '充值中', remark: '2小时内到账' }],
    success: [ { name: '充值成功' }, status.complete ]
  }
  //流量
  liuliang = {
    before : this.online,
    ing    : [ { name: '充值中', remark: '2小时内到账' }],
    success: [ { name: '充值成功' }, status.complete ]
  }
  //电影
  dianying = {
    before : this.online,
    ing    : [ { name: '出票中', remark: '' }],
    success: [ { name: '出票成功' }, status.complete ]
  }
  //火车
  huoche = {
    before : this.online,
    ing    : [ { name: '出票中' }],
    success: [ { name: '出票成功' }, status.complete ]
  }
  //酒店
  jiudian = {
    offline: this.offline,
    before : this.online,
    ing    : [ { name: '预约中' } ],
    success: [ { name: '预约成功' }, status.complete ]
  }
  //外卖
  waimai = {
    offline: this.offline,
    before : this.online,
    ing    : [{ name: '等待商家接单' },
              { name: '商家已接单' },
              { name: '美食制作中' },
              { name: '预计配送中', remark: '_wai_mai_cui_dan_' } ],
    success: [{ name: '已送达'}, status.complete ]
  }
  //机票
  jipiao = {
    before : this.online,
    ing    : [{ name: '出票中' }],
    success: [{ name: '出票成功'}, status.complete ]
  }

  //门票
  menpiao = {
    before : this.online,
    ing    : [{ name: '出票中' }],
    success: [{ name: '出票成功'}, status.complete ]
  }
  //火车票
  huochepiao = {
    before : [{ name: '提交退票申请' }],
    ing    : [{ name: '退票中', remark: '预计1个工作日内完成退票' }],
    success: [{ name: '退票成功' }],
    fail   : [{ name: '退票失败' }]
  }
  //水电煤
  sdm = {
    before : this.online,
    ing    : [ { name: '缴费中'} ],
    success: [ { name: '缴费成功' }, status.complete ]
  }

  //邻趣
  paotui = {
    before : this.online,
    ing    : [ { name: '等待配送员接单'}, { name: '已接单'}, { name: '已取货'} ],
    success: [ { name: '已送达'}, status.complete ]
  }
  //余额
  balance = {
    before : this.online,
    ing    : [ { name: '充值中'} ],
    success: [ { name: '充值成功'}, status.complete ]
  }

  //取消
  cancelled = [ status.cancelled ]
  //订单失败
  fail      = [ status.fail ]
  //退款
  pay_back  = [
    status.pay_back_wait,
    status.pay_back,
    status.pay_back_success
    //status.pay_back_ed
  ]
}

let status = {
  'error': {
    name : '异常'
  },
  'ordered':{
    name : '已下单'
  },
  'be_paid': {
    name  : '待支付',
    remark: '亲，15分钟后订单会自动取消，快快支付吧'
  },
  'paid': {
    name  : '已支付',
    remark: '马上为您处理'
  },
  'complete': {
    name : '已完成'
  },
  'canceling': {
    name : '取消中'
  },
  'pay_back_wait': {
    name  : '等待退款',
    remark: '预计12小时内处理完成您的退款请求'
  },
  'pay_back': {
    name  : '退款中',
    remark: '预计1~5个工作日内完成您的退款'
  },
  'pay_back_success': {
    name  : '已退款',
    remark: '实际到账时间取决于银行'
  },
  'cancelled': {
    name : '已取消',
    remark: '_qu_xiao_yuan_yin_'
  },
  'remove': {
    name : '已删除'
  },
  'ing': {
    name: '处理中'
  },
  'fail': {
    name: '订单失败'
  }
  //,
  // 'pay_back_ed': {
  //   name: '退款到账'
  // }
}

export default new timeline()
