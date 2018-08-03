const CHANGE_TEXT = 'com.yangapp.jike-like.change_text'
const CHANGE_IMG = 'com.yangapp.jike-like.change_img'

export let textReducer = (state = {content: '瓦恁'}, action) => {
  if (action.type === CHANGE_TEXT) {
    return Object.assign({}, state, {content: action.payload.text})
  }
  return state
}

export let imgReducer = (state = {content: ''}, action) => {
  if (action.type === CHANGE_IMG) {
    return Object.assign({}, state, {content: action.payload.img})
  }
  return state
}

export function changeTextAction(text) {
  return {
    type: CHANGE_TEXT,
    payload: {
      text,
    },
  }
}

export function changeImgAction(img) {
  return {
    type: CHANGE_IMG,
    payload: {
      img,
    },
  }
}
