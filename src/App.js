import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Router } from './configs';
import { Warna } from './utils/Warna';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={Warna.primary} />
      <Router />
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})
