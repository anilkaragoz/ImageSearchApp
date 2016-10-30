import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import Api from '../utils/Api';
import GifGrid from './GifGrid';
import FullScreenImageViewer from './FullScreenImageViewer';

export default class SearchResultPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      images: [],
      offSet: 0,
      page: 1,
      showFullScreen: false,
    }
  }

  async getImages() {
    this.setState({
      images: await Api.getImagesWithQuery(this.props.searchInput, this.state.page),
      selectedImage: '',
      isLoading: false,
    })
  }

  async nextPage() {
    await this.setState({
      page: this.state.page + 1,
    });
    let newImages = await Api.getImagesWithQuery(this.props.searchInput, this.state.page);
    this.setState({
      images: [...this.state.images, ...newImages],
    });
    return (newImages.length);
  }

  componentDidMount() {
    this.getImages();
  }

  toggleFullScreen(url) {
    this.setState({
      showFullScreen: !this.state.showFullScreen,
      selectedImage: url,
    });
  }

  displayFullScreen() {
    if (this.state.showFullScreen)
      return (
        <FullScreenImageViewer
          url={this.state.selectedImage}
          onPress={this.toggleFullScreen.bind(this)}
        />);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.displayFullScreen()}
        <ActivityIndicator
          animating={this.state.isLoading}
          color="#fff"
          size="large"
        />
        <GifGrid
          images={this.state.images}
          onPress={this.toggleFullScreen.bind(this)}
          onScrollReachedEnd={this.nextPage.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dfdfdf',
  },
});
