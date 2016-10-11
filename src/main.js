import { render } from 'react-dom'
import routes from './rootRouter'
import 'normalize'
import 'main.css'
import './styles/rate.css'
window.$config = {}
$config.HOST = 'localhost,192.168.199.127'.indexOf(location.hostname) >= 0  ? 'https://dev-api.otosaas.com' : `${location.origin}/api`
$config.BMap = window.BMap

render(routes, document.getElementById('root'))
