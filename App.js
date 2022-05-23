//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NativeComp from './Screens/NativeComp';

// create a component
const App = () => {
  return (
    <View style={styles.container}>
     <NativeComp />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

//make this component available to the app
export default App;
