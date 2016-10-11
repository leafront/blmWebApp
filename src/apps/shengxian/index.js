import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

const store = createStore(reducers, applyMiddleware(thunk))

const App = ({children}) => <Provider store={ store }>{ children }</Provider>

export default App
