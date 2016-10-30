import React from 'react';
import {
  Navigator,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Main from './components/Main';

const routeMapper = {
  LeftButton: (route, navigator) => {
    if (route.index === 0) {
      return null;
    }
    return (
      <TouchableOpacity onPress={() => navigator.pop()}>
        <Text style={styles.navBarBackButton}> {'Back'} </Text>
      </TouchableOpacity>
    );
  },
  RightButton: () => null,
  Title: route => <Text style={styles.navBarTitle}> {route.title} </Text>,
};

const App = () => (
  <Navigator
    initialRoute={{
      title: 'Image Search',
      component: Main,
      index: 0,
    }}
    navigationBar={
      <Navigator.NavigationBar
        routeMapper={routeMapper}
        style={styles.navBar} />
      }
    renderScene={(route, navigator) =>
          <route.component navigator={navigator} {...route.passProps} />}
    configureScene={(route, routeStack) => Navigator.SceneConfigs.FadeAndroid}
  />
);

const styles = StyleSheet.create({
  navBar: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.1,
  },
  navBarTitle: {
    color: "grey",
    paddingTop: 5,
    fontSize: 21,
  },
  navBarBackButton: {
    marginLeft: 10,
    paddingTop: 5,
    fontSize: 20,
    fontWeight: '100',
    color: 'grey',
  },
});

export default App;
