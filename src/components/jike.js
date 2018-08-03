import React from 'react'
import { connect } from 'react-redux'
import { Stage, Layer, Rect, Text } from 'react-konva'
import { _ } from 'lodash'
import { changeTextAction, changeImgAction } from '../reducers/textReducer'
import { JikeOpenJsSDK } from '@ruguoapp/jike-open-js-sdk'

const ONE_CHAR_HEIGHT = 400
const jikeSDK = new JikeOpenJsSDK('')

class JikeComponent extends React.Component {

  componentDidMount() {
    this.props.onImgChange(this.getDataUrl())
  }

  componentDidUpdate() {
    // TODO: konva的文档中没有找到如何在stage绘制完成后响应，暂时这样处理
    setTimeout(
      () => this.props.onImgChange(this.getDataUrl()),
      100
    )
  }

  getDataUrl() {
    return this.refs.stage._stage.toDataURL()
  }

  render() {
    const { text, img, onTextChange, onJikeUserinfo } = this.props
    return (
      <div style={this.styles().wrapper}>
        <h1>JIKE-LIKE</h1>
        <span>1. 在下面输入框中输入字符（逻辑简单，字符太多会大笨蛋）</span>
        <br />
        { jikeSDK.isInJikeApp() &&
        <span>或者 <a href="javascript:void(0);" onClick={() => { onJikeUserinfo() }}>直接使用即刻用户名</a></span>}
        <input style={this.styles().input}
               type="Text"
               defaultValue={text}
               onChange={onTextChange} />
        2. 然后随意保存这个图
        <div calss="stage">{ this.renderStage() }</div>
        <img style={this.styles().output} src={img} />
      </div>
    )
  }

  renderStage() {
    const { text } = this.props
    return (
      <Stage width={512} height={512} ref={'stage'} style={this.styles().stage}>
        <Layer>
          <Rect
            x={0}
            y={0}
            width={512}
            height={512}
            fillLinearGradientStartPoint={{ x: 512, y: 512}}
            fillLinearGradientEndPoint={{ x: 0, y: 0}}
            fillLinearGradientColorStops={[0, '#FECB11', 1, '#FFE411']}
          />
          { this.renderText(text, 20, 15) }
        </Layer>
      </Stage>
    )
  }

  renderText(text, offsetX, offsetY) {
    const bigger = Math.max(offsetX, offsetY)
    const fontSize = this.calculateFontSize(text)
    const offsetRatio = fontSize * 2 / ONE_CHAR_HEIGHT
    return _.times(bigger, (n) => {
      const x = offsetX * n / bigger * offsetRatio
      const y = offsetY * n / bigger * offsetRatio
      return <Text
        x={0}
        y={0}
        width={512}
        height={512}
        offsetY={- (512 - fontSize) / 2}
        text={text}
        fill="#FFFFFF"
        align="center"
        fontSize={fontSize}
        fontFamily={'menlo, Roboto Mono, Courier New, Courier'}
        shadowColor="#5EC1FA"
        shadowOffset={{x, y}}
        shadowBlur={0}
        shadowOpacity={1.0}
      />
    })
  }

  calculateFontSize(text) {
    const REGEX = /[a-zA-z]/g

    const totalCount = text.length
    if (totalCount <= 1) {
      return ONE_CHAR_HEIGHT
    }

    const matches = text.match(REGEX)
    const thinCharCount = (matches && matches.length > 0) ? matches.length : 0
    const wideCharCount = totalCount - thinCharCount

    // Assume thin is 1:2, wide is 2:2
    // ---------
    // |  |    |
    // ---------

    const ratio = 1.8
    return ONE_CHAR_HEIGHT / (thinCharCount + wideCharCount * ratio) * ratio
  }

  styles() {
    return {
      wrapper: {
        display: 'flex',
        boxSizing: 'border-box',
        width: '100%',
        maxWidth: 512,
        padding: 10,
        margin: 'auto',
        flexDirection: 'column',
      },
      input: {
        borderRadius: 5,
        border: '1px solid #ddd',
        padding: '5px 10px',
        margin: '10px 0',
        lineHeight: 2,
        textAlign: 'center',
        background: 'transparent',
        outline: 'none',
        appearance: 'none',
        fontSize: 20,
      },
      stage: {
        display: 'none'
      },
      output: {
        width: '100%'
      }
    }
  }
}

function mapStateToProps(state) {
  return {
    text: state.text.content,
    img: state.img.content
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    onTextChange: (event) => {
      dispatch(changeTextAction(event.target.value))
    },

    onImgChange: (img) => {
      dispatch(changeImgAction(img))
    },

    onJikeUserinfo: () => {
      jikeSDK.getUserInfo().then((result) => {
        const screenname = result.user.screenName
        dispatch(changeTextAction(screenname))
      })
    },
  }
}

export let Jike = connect(mapStateToProps, mapDispatchToProps)(JikeComponent)
