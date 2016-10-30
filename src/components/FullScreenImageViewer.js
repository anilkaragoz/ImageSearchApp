import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import LoadingImage from './LoadingImage';

export default class FullScreenImageViewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opacity: new Animated.Value(0),
      didFinishAnimation: false,
    };
  }

  componentDidMount() {
    this.makeItBig();
  }

  makeItBig() {
      Animated.spring(this.state.opacity,
      {
        toValue: 1,
        delay: 500,
      }
    ).start();
      this.setState({
        didFinishAnimation: true,
      });
  }

  dismiss() {
    this.setState({
      opacity: new Animated.Value(0),
      didFinishAnimation: false,
    });
    this.props.onPress('');
  }

  renderContent() {
    if (this.state.didFinishAnimation)
      return (
        <View style={{ width: 350, height: 400 }}>
          <ScrollView maximumZoomScale={5} minimumZoomScale={1}>
            <LoadingImage
              imageContainerStyle={{ height: 350 }}
              url={this.props.url}
              style={{ height: 350, width: 350, resizeMode: 'contain' }}
            />
          </ScrollView>
        </View>
      );
  }

  renderCross() {
    if (this.state.didFinishAnimation)
      return (
        <TouchableOpacity onPress={this.dismiss.bind(this)}>
            <Text style={{ color: 'white', fontSize: 40 }}> ✕ </Text>
        </TouchableOpacity>
      );
  }

  render() {
    return (
        <Animated.View style={{
          opacity: this.state.opacity,
          position: 'absolute',
          height: Dimensions.get('window').height - 64,
          width: Dimensions.get('window').width,
          alignItems: 'center',
          backgroundColor: 'black',
          zIndex: 3,
          top: 64,
          left: 0,
        }}>
          {this.renderCross()}
          {this.renderContent()}
        </Animated.View>
    );
  }
}
