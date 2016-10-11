import ajax from './ajax'
import url  from './url'
class marketing {
  constructor () {
    //是否为测试环境
    this.debug = /dev.|localhost|192.168/.test(window.location.host)
    let host = window.location.host

    this.stg   = /stg/.test(host) ? 'stg.' : ''
    if(url.query.env == 'prod' || this.stg) {
      this.debug = false
    }

    this.serverUrl = this.getServerUrl()
  }
  getServerUrl = () => this.debug ? 'http://dev.manage.boluomeet.com' : `http://${ this.stg }manage.boluomeet.com`
  //请求服务
  send(p, cb) {
    p.url = url.formatUrl(p.url, this.serverUrl)
    ajax.send(p, cb)
  }
}

export default new marketing()
