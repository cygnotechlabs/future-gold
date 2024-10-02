import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Help = () => {
  return (
    <View style={styles.container}>
  
      <Text style={styles.title}>We will be in touch with you soon! Thank You!</Text>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9', // Light background color
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    resizeMode: 'contain', // Ensures the image fits within the dimensions
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    justifyContent:'center',
    textAlign:'center',
    color:"#000000",


  },
 
});

export default Help;
