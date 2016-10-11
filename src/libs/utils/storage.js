
class storage {
  constructor() {
    this.store = window.localStorage
  }

  get    = k      => this.store.getItem(k)

  set    = (k, v) => this.store.setItem(k, v)

  oget   = k      => JSON.parse(this.get(k) || '{}')

  oset   = (k, o) => this.set(k, JSON.stringify(o))

  remove = k      => this.store.removeItem(k)
}

export default new storage()
