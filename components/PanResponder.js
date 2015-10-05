const React = require('react-native')

const {
  Component,
  StyleSheet,
  Animated,
  Text,
  View,
  PanResponder,
  TouchableWithoutFeedback
} = React;

const SQUARE_DIMENSIONS = 40

class PanResponderAPI extends Component {
  constructor (props) {
    super(props)

    this.state = {
      pan: new Animated.ValueXY()
    }

    // Bind functions
    this.getStyle = this.getStyle.bind(this)
  }

  componentWillMount () {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        // The guesture has started. Show visual feedback so the user knows
        // what is happening!
        this.state.pan.setOffset({
          x: this.state.pan.x.__getAnimatedValue(),
          y: this.state.pan.y.__getAnimatedValue()
        })

        this.state.pan.setValue({
          x: 0,
          y: 0
        })

        // gestureState.{x,y}0 will be set to zero now
      },
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.pan.x,
          dy: this.state.pan.y
        }
      ]),
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        Animated.spring(this.state.pan, {
          toValue: 0
        }).start()
      }
    })
  }

  getStyle () {
    return [
      styles.square,
      {
        transform: [
          {
            translateX: this.state.pan.x
          },
          {
            translateY: this.state.pan.y
          }
        ]
      }
    ]
  }

  render () {
    return (
      <View style={styles.container}>
        <Animated.View style={this.getStyle()} {...this._panResponder.panHandlers} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  square: {
    width: SQUARE_DIMENSIONS,
    height: SQUARE_DIMENSIONS,
    backgroundColor: 'yellow'
  }
})

module.exports = PanResponderAPI
