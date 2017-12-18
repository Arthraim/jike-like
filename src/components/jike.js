import React from 'react'
import { connect } from 'react-redux'
import { Stage, Layer, Rect, Text } from 'react-konva'
import { changeTextAction, changeImgAction } from '../reducers/textReducer'

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
    const { text, img, onTextChange } = this.props
    return (
      <div style={this.styles().wrapper}>
        <h1>JIKE-LIKE</h1>
        1. 在下面输入框中输入字符（逻辑简单，字符太多会大笨蛋）
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
            fill={'#FDDF13'}
          />
          <Text
            x={0}
            y={0}
            width={512}
            height={512}
            offsetY={-(512-400)/2}
            text={text}
            fill="#FFFFFF"
            align="center"
            fontSize={400}
            shadowColor='#5EC1FA'
            shadowOffset={{x: 20, y: 15}}
            shadowBlur={0}
            shadowOpacity={1.0}
          />
        </Layer>
      </Stage>
    )
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
    }
  }
}

export let Jike = connect(mapStateToProps, mapDispatchToProps)(JikeComponent)
