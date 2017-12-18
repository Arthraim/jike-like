const CHANGE_TEXT = 'com.yangapp.jike-like.change_text'

export let textReducer = (state = {content: '瓦'}, action) => {
  if (action.type === CHANGE_TEXT) {
    return Object.assign({}, state, {content: action.payload.text})
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
