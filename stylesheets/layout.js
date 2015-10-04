const React = require('react-native')
const { StyleSheet } = React;

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
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'black'
  },
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 65,
    backgroundColor: 'red'
  }
})

module.exports = styles
