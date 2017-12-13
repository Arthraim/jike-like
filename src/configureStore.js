import { combineReducers, createStore } from 'redux'

import { textReducer } from './reducers/textReducer'

const reducer = combineReducers({
  text: textReducer,
})

export let store = createStore(reducer)

