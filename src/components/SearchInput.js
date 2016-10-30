import React, { Component } from 'react';
import {
  View,
  Animated,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

class SearchInput extends Component {
  constructor() {
    super();

    this.state = {
      bounceValue: new Animated.Value(0),
    };
  }

  displayCross() {
    if (this.props.value !== '')
      return (
        <TouchableOpacity onPress={this.props.onCrossPress}>
          <Text style={styles.cross}>
            ✕
          </Text>
        </TouchableOpacity>

      );
  }

  displayButton() {
    if (this.props.value !== '')
      return (
        <TouchableOpacity onPress={this.props.onSearch}>
          <Animated.View
            style={{
              marginRight: 0,
              backgroundColor: '#424242',
              borderRadius: 2,
              height: 39,
              width: 40,
              transform: [
                {scale: this.state.bounceValue}
              ]
            }}>
            <View style={styles.buttonContainer}>
              {this.props.children}
              <Text style={{ color: 'white', fontWeight: 'bold' }}> GO </Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
    );
  }

  startAnimation() {
    this.state.bounceValue.setValue(1.5);
    Animated.spring(
      this.state.bounceValue,
      {
        toValue: 1,
        friction: 5,
      }
    ).start();
  }

  render() {
    return(
      <View style={styles.searchInput}>
        <TextInput
          style={styles.searchTextInput}
          value={this.props.value}
          autoCorrect={false}
          selectionColor="#c6c6c6"
          autoCapitalize="none"
          placeholder="Landscapes, Paris ..."
          onChangeText={(text) => {
            if (this.props.value === '' && text.length === 1)
              this.startAnimation();
            this.props.onChangeText(text);
          }}
        />
          {this.displayCross()}
          {this.displayButton()}
      </View>
    );
  }
}

export default SearchInput;

const styles = StyleSheet.create({
  searchInput: {
    flexDirection: 'row',
    height: 40,
    width: 240,
    backgroundColor: '#dfdfdf',
    borderWidth: 0.5,
    borderRadius: 2,
    alignItems: 'center',
  },
  searchTextInput: {
    paddingLeft: 10,
    height: 39,
    width: 170,
    color: 'grey',
  },
  cross: {
    width: 29,
    fontSize: 20,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
