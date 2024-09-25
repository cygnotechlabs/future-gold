import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const More = () => {
  const navigation = useNavigation();

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const navigateToScreen = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          style={styles.profilePicture}
        />
        <Text style={styles.username}>Asarudheen k s</Text>
        <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        
      </View>

      <View style={styles.contentContainer}>
       

        <TouchableOpacity style={styles.routingContainer} onPress={() => navigateToScreen('Help')}>
          <Icon name="help-circle-outline" size={30} color="black" style={styles.icon} />
          <Text style={styles.text}>Help</Text>
          <Icon name="chevron-forward-outline" size={30} color="black" style={styles.navIcon} />
        </TouchableOpacity>
        <View style={styles.underline} />

        <TouchableOpacity style={styles.routingContainer} onPress={() => navigateToScreen('Contact')}>
          <Icon name="headset-outline" size={30} color="black" style={styles.icon} />
          <Text style={styles.text}>Contact Us</Text>
          <Icon name="chevron-forward-outline" size={30} color="black" style={styles.navIcon} />
        </TouchableOpacity>
        <View style={styles.underline} />

        <TouchableOpacity style={styles.routingContainer} onPress={() => navigateToScreen('About')}>
          <Icon name="information-circle-outline" size={30} color="black" style={styles.icon} />
          <Text style={styles.text}>About Us</Text>
          <Icon name="chevron-forward-outline" size={30} color="black" style={styles.navIcon} />
        </TouchableOpacity>
        <View style={styles.underline} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  imageContainer: {
    backgroundColor: "#734820",
    width: "100%",
    height:200,
    alignItems: "center",
    paddingVertical: 20,
  },
  profilePicture: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: (width * 0.4) / 2,
    marginBottom: 10,
    marginTop:80,

  },
  username: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'semibold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    
  },
  buttonText: {
    color: 'black',
    fontWeight:"bold", 
    textDecorationLine: 'none', 
    fontSize: 16,
  },
  underline: {
    height: 1,
    backgroundColor: 'black',
    width: '100%',
    marginTop: 10,
  },
  contentContainer: {
    marginTop:200,
    paddingHorizontal: 20,
  },
  routingContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    flex: 1, 
    fontSize: 20,
    textAlign: 'left',
    fontWeight:"600",
    color:"black"
  },
  navIcon: {
    alignSelf: 'flex-end',
  },
});

export default More;
