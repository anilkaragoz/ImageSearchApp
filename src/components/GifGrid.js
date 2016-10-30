import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import LoadingImage from './LoadingImage';

export default class GifGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      noMorePhotos: false,
    };
  }
  
  async onScroll(e) {
    var windowHeight = Dimensions.get('window').height,
      height = e.nativeEvent.contentSize.height,
      offset = e.nativeEvent.contentOffset.y;
    // if scroll is at the bottom of the page
    if(windowHeight + offset >= height + 50 && this.state.isLoading === false && !this.state.noMorePhotos){
      this.setState({
        isLoading: true,
      })
      if (await this.props.onScrollReachedEnd() === 0)
        this.setState({
          noMorePhotos: true,
        })
      this.setState({
        isLoading: false,
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scroll}
          onScroll={(e) => this.onScroll(e)}
          >
          <View style={styles.gridContainer}>
            {this.props.images.map((elem) => {
              return (
                <TouchableOpacity
                  key={'touchable' + elem.id}
                  onPress={() => this.props.onPress(`https://farm${elem.farm}.staticflickr.com/${elem.server}/${elem.id}_${elem.secret}_c.jpg`)}
                >
                  <LoadingImage
                    key={elem.id}
                    imageContainerStyle={styles.imageContainer}
                    url={`https://farm${elem.farm}.staticflickr.com/${elem.server}/${elem.id}_${elem.secret}_s.jpg`}
                    style={{ height: 100, width: 100 }}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
          <ActivityIndicator animating={this.state.isLoading} color="#000" size="large" />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  imageContainer: {
    margin: 5,
    borderWidth: 7,
    backgroundColor: 'white',
    borderColor: 'white',
  },
  gridContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
  },
  scroll: {
    flex: 1,
  },
});
