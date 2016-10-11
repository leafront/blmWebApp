'use strict'

import ajax from './ajax'
import url  from './url'

//import boluome from './boluome'

//let isProdEnv = process.env.NODE_ENV == 'production' ? true : false

let toJSON    = str  => JSON.parse(str)
let toJSONStr = json => JSON.stringify(json)

window._tools = {
  //回调 List
  callbackList: {},
  //登录成功回调
  loginCallback: function() {},
  scanCallback : function() {},
  //执行回调函数
  runCallback: function(name, args) {
    let fn = this.callbackList[name]
    fn && typeof fn == 'function' && fn(null, args || '')
    delete this.callbackList[name]
  },
  scanSuccess: function(code) {
    if(code) {
      this.scanCallback(null, code || '')
    } else {
      this.scanCallback('no code')
    }
  },
  //登录成功回调
  loginSuccess: function(user) {
    if(user) {
      this.loginCallback(null, JSON.parse(user))
    } else {
      this.loginCallback('no user')
    }
  }
}

class app {
  //构造器
  constructor() {
    let host = window.location.host
    //是否为测试环境
    this.debug = /dev.|localhost|192.168/.test(host)
    this.stg   = /stg/.test(host) ? 'stg.' : ''

    // this.stg = 'stg.'
    //服务器域名
    this.serverUrl = this.getServerUrl()
    //初始化参数
    this.alertList = []
    this.callbackIndex = 0
    this.shareInfo = {}
    this.hasUser   = false
    let query = url.parseSearch()

    if(query.uid && query.token && query.phone) {
      this.user = {
        id   : query.uid,
        token: query.token,
        phone: query.phone
      }
      this.hasUser = true
    } else if(typeof boluome != 'undefined' || window.boluome) {
      //是否连接到 App
      this.connected     = true
      //定义回调队列
      this.currentUser((err, user) => {
        if(err) { console.log(err); return }
        this.user    = user
        this.hasUser = true
      })
    }
    console.log('connect app:', this.connected)
  }
  download     = ()    => this.open('http://a.app.qq.com/o/simple.jsp?pkgname=com.kuping.android.boluome.life')
  //获取服务 URL
  getServerUrl = ()    => 'https://dev.api.boluomeet.com' //this.debug ? 'https://dev.api.boluomeet.com' : `https://${ this.stg }api.boluomeet.com`
  //格式化 URL
  formatUrl    = (url) => ((/^[http https]/).test(url)) ? url : `${ this.serverUrl }${ url }`
  //请求服务
  send(p, cb) {
      p.url = this.formatUrl(p.url)

      if(p.no_token) {
        delete p.headers
        delete p.no_token
      } else if(this.user) {
        !p.headers && (p.headers = {})
        p.headers.Authorization = this.user.token
        p.headers.ID            = this.user.id
      }

      ajax.send(p, cb)
  }
  //打开新窗口
  open(url, keep) {
    url = this.formatUrl(url)
    if(this.connected) {
      boluome.open(url)
    } else {
      location.href = url
    }
  }
  //打开服务
  openSvc(svc) {
    if(this.connected) {
      boluome.openService(svc, '', '', '');
    }
  }
  //获取当前用户 或者 登陆
  currentUserOrLogin(cb) {
    this.currentUser(function(err, user) {
      if(err) { console.log(err); return }
      if(user && user.id) {
        cb(null, user)
      } else {
        this.login(cb)
      }
    }.bind(this))
  }
  //获取当前登录用户信息
  currentUser(cb) {
    if(this.connected) {
      if(boluome.ios) {
        boluome.currentUser(this.defineCallback(cb))
      } else {
        let user = boluome.currentUser  && boluome.currentUser() || '{}'
        cb(null, toJSON(user))
      }
    } else if(this.user) {
      cb(null, this.user)
    }
  }
  //获取 APP 版本
  getVersion(cb) {
    if(this.connected) {
      if(boluome.ios) {
        boluome.getVersion(this.defineCallback(cb))
      } else {
        cb(null, boluome.getVersion())
      }
    }
  }
  toast(msg) {
    if(this.connected) {
      boluome.toast(msg)
    }
  }
  //获取系统
  getOS() {
    if(this.connected) {
      if(boluome.ios) {
        return 'iOS'
      } else {
        return 'Android'
      }
    }
  }
  telShow(phones) {
    if(this.connected && boluome.showTels) {
      boluome.showTels(JSON.stringify(phones))
    }
  }
  scan(cb) {
    if(this.connected && boluome.scanCode) {
      _tools.scanCallback = function(err, reply) { tools.app.alert(reply) }
      boluome.scanCode()
    }
  }
  //显示分享
  shareShow() {
    let info = this.shareInfo
    if(this.connected && info.title) {
      boluome.showShare('WEIXIN_CIRCLE,WEIXIN,QQ', info.icon, info.title, info.content, info.url)
      if(typeof info.cb == 'function') {
        this.shareCallback = info.cb
      }
    }
  }
  //分享
  share(channel = 'WEIXIN_CIRCLE') {
    let info = this.shareInfo
    if(this.connected && info.title) {
        boluome.share(channel, info.icon, info.title, info.content, info.url);
        if(typeof info.cb == 'function') {
          this.shareCallback = info.cb
        }
    }
  }
  //iOS 回调函数处理方法
  //定义函数队列
  defineCallback(fn) {
    let name = `callback${ this.callbackIndex++ }`
    _tools.callbackList[name] = fn
    return name;
  }
  //确认框
  confirm(word, okTitle, cancelTitle, okCallback, cancelCallback) {
    if (this.connected) {
      if (boluome.ios) {
        boluome.confirm(word, okTitle, this.defineCallback(okCallback), cancelTitle, this.defineCallback(cancelCallback));
      } else {
        boluome.confirm(word, okTitle,
          "javascript:_tools.runCallback('" + this.defineCallback(okCallback) + "')",
          cancelTitle,
          "javascript:_tools.runCallback('" + this.defineCallback(cancelCallback) + "')"
        );
      }
    } else {
      if (window.confirm(word)) {
          okCallback && okCallback();
      }
    }
  }
  //获取坐标 城市 省份
  geo(cb) {
    if (this.connected) {
      if (boluome.ios) {
          boluome.getLocation(this.defineCallback(cb));
      } else {
          cb(null, JSON.parse(boluome.getLocation()))
      }
    } else {
      navigator.geolocation.getCurrentPosition(function (position) {
        point = {
          "lng": position.coords.longitude,
          "lat": position.coords.latitude
        }
        cb(null, point)
      });
    }
  }
  //调起 App 的收银台
  pay(id, orderType) {
    if(this.connected) {
      boluome.payNow(id, orderType)
    }
  }
  //打开酒店详情
  toJiudian(id) {
    this.open(`http://dev.web.boluomeet.com/info/jiudian/?id=${ id }`)
  }
  //打开景点介绍
  toJingdian(id) {
    this.open(`http://dev.web.boluomeet.com/info/menpiao/place?id=${ id }`)
  }
  toMap(title, name, lat, lng) {
    if(this.connected) {
      boluome.goMap(title, name, lat, lng)
    }
  }

  //去到餐厅
  toRestaurant(rid, chn) {
    let data = {
      url: '/waimai/v1/restaurant',
      data: {
        supplier: chn,
        restaurant_id: rid
      },
      no_token: true
    }
    this.send(data, (err, reply) => {
      if(err) { console.log(err); return; }
      if(reply.code == 0) {
        boluome.goRestaurant(toJSONStr(reply.data))
      } else {
        console.log(reply.message);
      }
    })
  }
  //获取优惠券
  coupon(cb) {
    this.currentUser(function(err, user) {
      if(err) { console.log(err); return }

      let data = {
        url   : '/user/get_coupon_list',
        method: 'POST',
        data  : {
          userId: user.id
        }
      }
      this.send(data, cb)
    }.bind(this))
  }
  //获取余额明细
  balance(cb) {
    this.currentUser(function(err, user) {
      if(err) { console.log(err); return }
      let data = {
        url   : `/balance/deal/${ user.id }`,
        method: 'GET'//,
        //no_token: true
      }
      this.send(data, cb)
    }.bind(this))
  }
  //退票
  refundTicket(type, data, cb) {
    this.confirm('出行一次不容易！', '去意已决', '我再想想', function() {
      let url = ''
      switch (type) {
        case 'huoche': url = '/huoche/ticket/refund'; break
        default: break
      }

      this.send({
        url     : url,
        data    : data,
        method  : 'POST',
        dataType: 'json',
        headers : {
          'Content-Type': 'application/json'
        }
      }, cb)
    }.bind(this), () => {})

  }
  //取消订单
  cancel(p, before, cb) {
    this.confirm('老板您真的忍心么T_T', '忍心取消', '我再想想', function() {
      before && before()
      let data = {
        url   : '/order/cancel',
        method: 'POST',
        data  : {
          id: p.id,
          partnerId: p.partnerId,
          orderType: p.orderType,
          channel  : p.channel
        }
      }
      this.send(data, (err, reply) => {
        if(err) {
          cb(err)
        } else {
          boluome && boluome.updateStatus && boluome.updateStatus()
          cb(null, reply)
        }
      })
    }.bind(this), () => {})
  }
  //获取订单
  order(p, cb) {
    let data = {
      url   : '/order/queryOrderById',
      method: 'POST',
      data  : p
    }
    this.send(data, cb)
  }
  //登录
  login(cb) {
    if (this.connected) {
      _tools.loginCallback = cb
      boluome.login()
    }
  }
  //提示框
  alert(word, cb) {
    this.alertList.push({
        word: word,
        cb  : cb
    });
    this.runAlert();
  }
  //设置页面标题
  setTitle(title) {
    if(this.connected) {
      boluome.setTitle && boluome.setTitle(title)
    }
    document.title = title
  }
  //拨打电话
  callPhone(phone) {
    if(this.connected && boluome && boluome.confirm) {
      this.confirm(`${ phone }`, '呼叫', '取消', function() {
        location.href = `tel:${ phone }`
      }.bind(this), () => {})
    } else {
      location.href = `tel:${ phone }`
    }
  }
  //执行提示框
  runAlert() {
    var temp = this.alertList.splice(0, 1)[0]

    if (this.connected) {
      if (boluome.ios) {
          boluome.alert(temp.word, this.defineCallback(temp.cb))
      } else {
          boluome.alert(temp.word, "javascript:_tools.runCallback('" + this.defineCallback(temp.cb) + "')")
      }
    } else {
      alert(temp.word)
      temp.cb && temp.cb()
    }
  }
}

export default new app()
