import React from 'react'
import { connect } from 'react-redux'

class JikeComponent extends React.Component {
  render() {
    const { text } = this.props
    return (
      <div style={this._style().div}>
        <span style={this._style().span}>{ text }</span>
      </div>
    )
  }

  _style() {
    return {
      div: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 512,
        height: 512,
        background: '#fddf13',
        background: 'linear-gradient(135deg, #fddf13 0%,#fddf13 30%,#fdc413 100%)',
      },
      span: {
        lineHeight: '512px',
        fontFamily: 'Avenir',
        fontSize: 400,
        color: '#FFFFFF',
        textShadow: '20px 15px #5EC1FA'
      },
    }
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
