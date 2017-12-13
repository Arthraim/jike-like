import React from 'react'
import { connect } from 'react-redux'
import { Stage, Layer, Rect, Text } from 'react-konva'

class JikeComponent extends React.Component {
  render() {
    const { text } = this.props
    return (
      <Stage width={512} height={512}>
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
            text="J"
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
