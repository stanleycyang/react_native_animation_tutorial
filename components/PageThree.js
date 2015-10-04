const React = require('react-native')
const styles = require('../stylesheets/layout')

// Destructured components
const {
  Component,
  Text,
  View,
  TouchableHighlight
} = React;

class PageThree extends Component {
  constructor(props) {
    super(props)
  }
  _handlePress() {
    this.props.navigator.push({id :1})
  }
  _goBack() {
    this.props.navigator.pop()
  }

  render() {
    return (
      <View style={[styles.container, {backgroundColor: 'purple'}]}>
        <Text style={styles.welcome}>Page three</Text>
        <TouchableHighlight onPress={this._handlePress.bind(this)}>
          <View style={{paddingVertical: 10, paddingHorizontal: 20, backgroundColor: 'black'}}>
            <Text style={styles.welcome}>Go to page one</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._goBack.bind(this)} style={styles.backButton}>
          <Text style={styles.welcome}>Back</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

module.exports = PageThree;
