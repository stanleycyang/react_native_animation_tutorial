const React = require('react-native')

const {
  StyleSheet,
  Animated,
  Component,
  View,
  Text,
  TouchableWithoutFeedback
}  = React

const ACTION_TIMER = 400
const COLORS = ['rgb(0,0,255)', 'rgb(111,235,62)']

class Gestures extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pressAction: new Animated.Value(0),
      textComplete: '',
      buttonWidth: 0,
      buttonHeight: 0
    }
    this.animationActionComplete = this.animationActionComplete.bind(this)
  }

  handlePressIn () {
    Animated.timing(this.state.pressAction, {
      duration: ACTION_TIMER,
      toValue: 1
    }).start(this.animationActionComplete)
  }

  handlePressOut () {
    Animated.timing(this.state.pressAction, {
      duration: this.state.pressAction.__getAnimatedValue() * ACTION_TIMER,
      toValue: 0
    }).start(this.animationActionComplete)
  }

  animationActionComplete () {
    let message = ''
    if (this.state.pressAction.__getAnimatedValue() === 1) {
      message = "Thank you for holding :-)"
    } else {
      message = 'Press and hold the button!'
    }

    this.setState({
      textComplete: message
    })
  }

  getButtonWidthLayout (e) {
    this.setState({
      buttonWidth: e.nativeEvent.layout.width - 6,
      buttonHeight: e.nativeEvent.layout.height - 6
    })
  }

  getProgressStyles () {
    let width = this.state.pressAction.interpolate({
      inputRange: [0, 1],
      outputRange: [0, this.state.buttonWidth]
    })

    let bgColor = this.state.pressAction.interpolate({
      inputRange: [0, 1],
      outputRange: COLORS
    })

    return {
      width: width,
      height: this.state.buttonHeight,
      backgroundColor: bgColor
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPressIn={this.handlePressIn.bind(this)}
          onPressOut={this.handlePressOut.bind(this)}
          >
          <View style={styles.button} onLayout={this.getButtonWidthLayout.bind(this)}>
            <Animated.View style={[styles.bgFill, this.getProgressStyles()]} />
            <Text style={styles.text}>Press me!</Text>
          </View>
        </TouchableWithoutFeedback>
        <View>
          <Text>{this.state.textComplete}</Text>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    padding: 10,
    borderWidth: 3,
    borderColor: '#111'
  },
  text: {
    backgroundColor: 'transparent',
    color: '#111'
  },
  bgFill: {
    position: 'absolute',
    top: 0,
    left: 0
  }
})

module.exports = Gestures;
