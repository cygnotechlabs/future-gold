import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const More = () => {
  const navigation = useNavigation();


  //LOGOUT
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => navigation.navigate('StartingPage') }, // Add your logout logic here
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }}
          style={styles.profilePicture}
        />
        <Text style={styles.username}>Welcome to Future Gold</Text>
      </View>

      <View style={styles.contentContainer}>
        <TouchableOpacity style={styles.routingContainer} onPress={() => navigation.navigate('Help')}>
          <Icon name="help-circle-outline" size={30} color="black" style={styles.icon} />
          <Text style={styles.text}>Help</Text>
          <Icon name="chevron-forward-outline" size={30} color="black" style={styles.navIcon} />
        </TouchableOpacity>
        <View style={styles.underline} />

        <TouchableOpacity style={styles.routingContainer} onPress={() => navigation.navigate('Contact')}>
          <Icon name="headset-outline" size={30} color="black" style={styles.icon} />
          <Text style={styles.text}>Contact Us</Text>
          <Icon name="chevron-forward-outline" size={30} color="black" style={styles.navIcon} />
        </TouchableOpacity>
        <View style={styles.underline} />

        <TouchableOpacity style={styles.routingContainer} onPress={() => navigation.navigate('About')}>
          <Icon name="information-circle-outline" size={30} color="black" style={styles.icon} />
          <Text style={styles.text}>About Us</Text>
          <Icon name="chevron-forward-outline" size={30} color="black" style={styles.navIcon} />
        </TouchableOpacity>
        <View style={styles.underline} />
      </View>

      <View style={styles.fullbutton}>
        <TouchableOpacity style={styles.LogoutButton} onPress={handleLogout}>
          <Text style={styles.LogoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fullbutton: {
    marginTop: 20,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  imageContainer: {
    backgroundColor: "#734820",
    width: "100%",
    height: 200,
    alignItems: "center",
    paddingVertical: 20,
  },
  profilePicture: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: (width * 0.4) / 2,
    marginBottom: 10,
    marginTop: 80,
  },
  username: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  LogoutButton: {
    width: 290,
    height: 60,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  LogoutButtonText: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
  },
  underline: {
    height: 1,
    backgroundColor: 'black',
    width: '100%',
    marginTop: 10,
  },
  contentContainer: {
    marginTop: 150,
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
    fontWeight: "600",
    color: "black"
  },
  navIcon: {
    alignSelf: 'flex-end',
  },
});

export default More;
