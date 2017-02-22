import React, { Component } from 'react';
import {
    AppRegistry,
    Text
} from 'react-native';

let App = require('./app/index')

class SnackBarAnd extends Component {
    render() {
        return (
            <App />
        );
    }
}

AppRegistry.registerComponent('SnackBarAnd', () => SnackBarAnd);

