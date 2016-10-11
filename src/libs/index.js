'use strict'

import payUtil from './pay'

import { url, app, storage, touch, marketing, moment, ajax } from './utils'

import { channel, payChannel, orderType } from './enum'
import objectAssign from 'object-assign'

class self {
  constructor() {
    objectAssign(this, { url, app, storage, touch, marketing, payUtil })

    this.enum = {
      channel   ,
      orderType ,
      payChannel
    }
  }

  date = (dateStr = '') => new moment(dateStr)

  hideIdCode(code) {
    let len    = code.length
    let hidLen = 1
    let str = code.substr(0, hidLen)

    for(let i = 0; i < (len - hidLen * 1); i++) {
      str += '*'
    }

    str += code.substr(len - hidLen, hidLen)

    return str
  }

  send  = (p, cb) => ajax.send(p, cb)

  clone = (o, newState) => objectAssign({}, o, newState)

  openInner = path => (this.app.open(this.url.innerUrl(path)))


}
let libs = new self()

export default libs
//window.tools = new self()
//export default new self()
