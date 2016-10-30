import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Animated,
} from 'react-native';

export default class LoadingImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opacity: new Animated.Value(0),
    };
  }

  onLoad() {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 500,
    }).start();
  }

  render() {
    return (
        <Animated.View
          style={this.props.imageContainerStyle}
        >
          <Animated.Image
            source={{uri: this.props.url}}
            style={[{opacity: this.state.opacity}, this.props.style]}
            onLoad={this.onLoad.bind(this)}
          />
        </Animated.View>
    );
  }
}
