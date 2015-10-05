const React = require('react-native')
const Dimensions = require('Dimensions')

const {
  Component,
  StyleSheet,
  Animated,
  Text,
  Easing,
  TouchableOpacity,
  View
} = React;

const {
  width,
  height
} = Dimensions.get('window')

const CIRCLE_DIMENSIONS = 40
const SPRING_CONFIG = {
  tension: 2,
  friction: 3 // Soft spring
}

const TIMING_CONFIG = {
  duration: 300,
  delay: 0,
  easing: Easing.in(Easing.ease)
}

class Playground extends Component {
  constructor (props) {
    super(props)
    this.state = {
      previewOpen: false,
      w: new Animated.Value(CIRCLE_DIMENSIONS),
      h: new Animated.Value(CIRCLE_DIMENSIONS),
      br: new Animated.Value(CIRCLE_DIMENSIONS/2)
    }

    this._triggerAnimation = this._triggerAnimation.bind(this)

  }

  _triggerAnimation (w1, h1, br1, w2, h2, br2) {
    // Set preview state
    this.setState({
      previewOpen: !this.state.previewOpen
    })

    Animated.sequence([
      Animated.parallel([
        Animated.timing(this.state.w, {
          ...TIMING_CONFIG,
          toValue: w1
        }),
        Animated.timing(this.state.h, {
          ...TIMING_CONFIG,
          toValue: h1
        }),
        Animated.timing(this.state.br, {
          ...TIMING_CONFIG,
          toValue: br1
        })
      ]),
      Animated.parallel([
        Animated.timing(this.state.w, {
          ...TIMING_CONFIG,
          toValue: w2
        }),
        Animated.timing(this.state.h, {
          ...TIMING_CONFIG,
          toValue: h2
        }),
        Animated.timing(this.state.br, {
          ...TIMING_CONFIG,
          toValue: br2
        })
      ])
    ]).start()
  }

  componentDidMount () {
    this._triggerAnimation(width, width, width/2, width, height, 0)
  }

  _closePreview () {
    this._triggerAnimation(width, width, width/2, CIRCLE_DIMENSIONS, CIRCLE_DIMENSIONS, CIRCLE_DIMENSIONS/2)
  }

  getStyle () {
    return [
      styles.circle,
      {
        width: this.state.w,
        height: this.state.h,
        borderRadius: this.state.br
      }
    ]
  }

  render () {
    let CloseButton

    if (this.state.previewOpen) {
       CloseButton =
          <TouchableOpacity onPress={this._closePreview.bind(this)} style={styles.closeButton}>
            <Text>Close me</Text>
          </TouchableOpacity>
    }

    return (
      <View style={styles.container}>
        <Animated.View
          style={this.getStyle()} />
          { CloseButton }
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1
  },
  circle: {
    backgroundColor: 'darkgreen'
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 65,
    backgroundColor: 'red',
    position: 'absolute',
    top: 20,
    left: 0,
  }
}

module.exports = Playground;
