const React = require('react-native')
const styles = require('../stylesheets/layout')

// Require components
const Playground = require('./PlayGround');

// Destructured components
const {
  Component,
  Text,
  View,
  TouchableHighlight
} = React;

class PageOne extends Component {
  constructor(props) {
    super(props)
  }

  _handlePress() {
    this.props.navigator.push({id: 2})
  }

  _goBack() {
    this.props.navigator.pop()
  }

  render() {
    return (
      <View style={[styles.container, {backgroundColor: 'green'}]}>
        <Playground />
        <Text style={styles.welcome}>Page one</Text>
        <TouchableHighlight onPress={this._handlePress.bind(this)} style={styles.button}>
          <Text style={styles.welcome}>Go to page two</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={this._goBack.bind(this)} style={styles.backButton}>
          <Text style={styles.welcome}>Back</Text>
        </TouchableHighlight>
      </View>
    )
  }
}


module.exports = PageOne;
