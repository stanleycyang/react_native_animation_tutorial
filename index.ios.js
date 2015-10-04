const React = require('react-native')
const Dimensions = require('Dimensions')

// Bring in components
const PageOne = require('./components/PageOne')
const PageTwo = require('./components/PageTwo')
const PageThree = require('./components/PageThree')

// Get the width and height of the window
const {
  width,
  height
} = Dimensions.get('window')

// Destructured components
const {
  AppRegistry,
  StyleSheet,
  Component,
  Text,
  View,
  Navigator,
  TouchableHighlight
} = React;

// Navigator configuration
const BaseConfig = Navigator.SceneConfigs.FloatFromRight

const CustomLeftToRightGesture = Object.assign({}, BaseConfig.gestures.pop, {
  // Make it snap back really quickly after canceling pop
  snapVelocity: 8,
  // Make it so we can drag anywhere on the screen
  edgeHitWidth: width
})

const CustomSceneConfig = Object.assign({}, BaseConfig, {
  // A tightly wound spring will make this transition fast
  springTension: 100,
  springFriction: 1,
  // Use our custom gesture defined above
  gestures: {
    pop: CustomLeftToRightGesture
  }
})

class ReactNativeTutorial extends Component {

  // A simple switch statement to allow our router to work
  _renderScene(route, navigator) {
    switch (route.id) {
      case 1:
        return <PageOne navigator={navigator} />
      case 2:
        return <PageTwo navigator={navigator} />
      case 3:
        return <PageThree navigator={navigator} />
    }
  }

  _configureScene(route) {
    return CustomSceneConfig;
  }

  render() {
    return (
      <Navigator
        initialRoute={{id: 1}}
        renderScene={this._renderScene}
        configureScene={this._configureScene} />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white'
  },
});

AppRegistry.registerComponent('ReactNativeTutorial', () => ReactNativeTutorial);
