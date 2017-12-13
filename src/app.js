import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Jike } from './components/jike'

import { store } from './configureStore'

const App = () => { return (<Jike />) }

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('container')
)