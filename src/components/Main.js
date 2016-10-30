import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Animated,
  Image,
  TouchableOpacity,
} from 'react-native';

import SearchInput from './SearchInput.js';
import SearchResultPage from './SearchResultPage';

export default class Main extends Component {
  constructor() {
    super();

    this.state = {
      searchInput: '',
      maskScale: new Animated.Value(0),
    };
  }

  onSearch() {
    this.state.maskScale.setValue(10);
    Animated.timing(
      this.state.maskScale,
      {
        duration: 400,
        toValue: 1000,
      }
    ).start(() => {
      this.props.navigator.push({
      title: 'Search Results',
      component: SearchResultPage,
      index: 1,
      passProps: { searchInput: this.state.searchInput }
      });
      setTimeout(() => {this.state.maskScale.setValue(0);
      this.setState({
        searchInput: '',
      })}, 200);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.mainImage} source={require('../assets/main-image.png')} />
        </View>
        <View style={{paddingTop: 20}}>
          <SearchInput
            value={this.state.searchInput}
            onChangeText={(text) => this.setState({searchInput: text})}
            onCrossPress={() => this.setState({searchInput: ''})}
            onSearch={this.onSearch.bind(this)}
            >
            <Animated.View style={{
              zIndex: 2,
              backgroundColor: '#fff',
              position:
              'absolute',
              marginLeft: 18,
              marginTop: 5,
              width: 1,
              height: 1,
              borderRadius: this.state.maskScale,
              transform: [
                {scale: this.state.maskScale}
              ]
            }} />
          </SearchInput>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    flexDirection: 'column',
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
  },
  imageContainer: {
    paddingTop: 50,
  },
  mainImage : {
    height: 200,
    width: 260,
    resizeMode: 'contain',
  },
});
