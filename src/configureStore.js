import { combineReducers, createStore } from 'redux'

import { textReducer, imgReducer } from './reducers/textReducer'

const reducer = combineReducers({
  text: textReducer,
  img: imgReducer
})

export let store = createStore(reducer)

