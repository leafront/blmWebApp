import app from './app'

class url {
  constructor() {
    this.query = this.parseSearch()
  }

  parseSearch() {
    let query = {}
    location.search.substring(1)
            .split("&").forEach(
              o => o && (o.split("=").reduce((p, o) => query[p] = decodeURIComponent(o)))
            )
    return query
  }

  stringifySearch(params) {
    let search = []
    for(let o in params) {
      search.push(`${ o }=${ app.getOS() == 'iOS' ? params[o] : encodeURIComponent(params[o]) }`)
    }
    return `?${ search.join('&') }`
  }

  formatUrl = (url, serverUrl) => ((/^[http https]/).test(url)) ? url : `${ serverUrl }${ url }`

  innerUrl = (path = '') => {
    let search = /[=&?]/.test(path) ? '' : location.search
    let href   = location.href

    if(!((/^\//).test(path))) {
      return `${ href.substr(0, href.lastIndexOf('/') + 1) }${ path }${ search }`
    } else {
      return `${ location.protocol }//${ location.host }${ path }${ search }`
    }
  }
}

export default new url()
