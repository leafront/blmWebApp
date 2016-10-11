'use strict'

//import $ from 'jquery'

class ajax {
  constructor() { }

  send(p, cb) {

    if(!(p && p.url)) {
      cb('params empty')
      return
    }

    let postData = {
      url     : p.url,
      data    : p.data,
      method  : p.method || 'GET',
      body    : '',
      dataType: p.dataType || '',
      headers : { "Content-Type": "application/x-www-form-urlencoded" }
    }
    if(p.headers) {
      for(let o in p.headers) {
        postData.headers[o] = p.headers[o]
      }
    }

    if(postData.data) {
      let body = []

      for(let o in postData.data) {
        body.push(`${ o }=${ postData.data[o] }`)
      }

      postData.body = body.join('&')
    }

    this.XMLHttpRequest(postData, cb)
  }

  XMLHttpRequest(reqData, cb) {
    let xhr = new XMLHttpRequest()
    let { method, url, body, data, headers, dataType } = reqData

    if(method == 'GET') {
      url += `?${ body }`
    }

    xhr.open(method, url, true)

    for(let o in headers) {
      xhr.setRequestHeader(o, headers[o])
    }

    if(/POST|PATCH/.test(method)) {
      switch (dataType) {
        case 'json': xhr.send(JSON.stringify(data)); break
        default    : xhr.send(body); break
      }
    } else {
      xhr.send(null)
    }

    xhr.onreadystatechange = () => {
      switch (xhr.readyState) {
        case 4:
          if(xhr.status == 200) {
            cb(null, JSON.parse(xhr.responseText))
          } else {
            console.log(xhr.status)
            cb('ajax fail')
          }
          break
        case 1: case 2: case 3: break //交互中
        default: break
      }
    }
  }

  //jQuery Ajax
  $ajax(data, cb) {
    // $.ajax(
    //   data
    // ).done((reply, status) => {
    //     if(status == 'success') {
    //       cb(null, reply)
    //     } else {
    //       cb('fail ajax')
    //     }
    // })
  }
  //fetch
  fetch(data, cb) {
    // let url = data.url
    //
    // delete data.url
    // delete data.data
    //
    // fetch(url, data).then(function(resp) {
    //   if(resp.status == 200) {
    //     resp.json().then((reply) => {
    //       cb(null, reply)
    //     });
    //   } else {
    //     console.log(res.status)
    //   }
    // }.bind(this), (err) => console.log(err))
  }
}
export default new ajax()
