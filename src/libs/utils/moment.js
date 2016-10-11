'use strict'

class moment {
  constructor(dateStr = '') {

    if(typeof dateStr == 'string' && dateStr.indexOf('T') < 0) {
      dateStr = dateStr.replace(/[-]/g, '/')
    }

    this.val = dateStr ? new Date(dateStr) : new Date()
  }
  format(format) {
    let date = this.val
    let val

    let zero = (n) => (n >= 10 ? n : `0${ n }`)

    if(format === 'x') {
      val = date.getTime();
    } else if(format === 'day') {
      let day = date.getDay()
      switch (day) {
        case 1: val = '周一'; break
        case 2: val = '周二'; break
        case 3: val = '周三'; break
        case 4: val = '周四'; break
        case 5: val = '周五'; break
        case 6: val = '周六'; break
        case 0: val = '周日'; break

        default: break
      }

    }
    else {
      let year   = date.getFullYear()
      let month  = date.getMonth() + 1
      let day    = date.getDate()
      let hour   = date.getHours()
      let minute = date.getMinutes()
      let second = date.getSeconds()


      val = format.replace('YYYY', year)
                  .replace('MM', month)
                  .replace('DD', day)
                  .replace('HH', zero(hour))
                  .replace('hh', hour > 12 ? (hour - 12) : zero(hour))
                  .replace('mm', zero(minute))
                  .replace('ss', zero(second))
    }

    return val
  }
}

export default moment
