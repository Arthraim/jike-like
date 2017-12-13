import React from 'react'
import { connect } from 'react-redux'

class JikeComponent extends React.Component {
  render() {
    const { text } = this.props
    return (
      <div>{ text }</div>
    )
  }
}

function mapStateToProps(state) {
  return {
    text: state.text.content,
  }
}

function mapDispatchToProps(dispatch: any) {
  return {}
}

export let Jike = connect(mapStateToProps, mapDispatchToProps)(JikeComponent)
