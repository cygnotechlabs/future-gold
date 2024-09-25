import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, FlatList, Alert, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import PushNotification from 'react-native-push-notification';

const RateAlert = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [value, setValue] = useState('gold');
  const [goldPrice, setGoldPrice] = useState({ bid: '1014.65', ask: '1000.56' });
  const [silverPrice, setSilverPrice] = useState({ bid: '22.00', ask: '22.50' });
  const [inputValue, setInputValue] = useState(0);
  const [alarms, setAlarms] = useState([]);
  const [frozenAlarmValue, setFrozenAlarmValue] = useState(null);

  const updateDateTime = () => {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const date = now.toLocaleDateString();
    setCurrentTime(time);
    setCurrentDate(date);
  };

  useEffect(() => {
    updateDateTime();
    const intervalId = setInterval(updateDateTime, 60000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchLivePrices = async () => {
      try {
        const goldResponse = await axios.get('https://www.goldapi.io/api/XAU/AED', {
          headers: { 'x-access-token': '' } // Add your API token here
        });
        const silverResponse = await axios.get('https://www.goldapi.io/api/XAG/AED', {
          headers: { 'x-access-token': '' } // Add your API token here
        });
        setGoldPrice({ bid: goldResponse.data.bid.toFixed(2), ask: goldResponse.data.ask.toFixed(2) });
        setSilverPrice({ bid: silverResponse.data.bid.toFixed(2), ask: silverResponse.data.ask.toFixed(2) });
      } catch (error) {
        console.error('Error fetching live prices:', error);
      }
    };

    fetchLivePrices();
    const timer = setInterval(fetchLivePrices, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setInputValue(0);
    setFrozenAlarmValue(null);
  }, [value]);

  useEffect(() => {
    if (frozenAlarmValue === null) {
      setFrozenAlarmValue(getBidRate().toFixed(2));
    }
  }, [frozenAlarmValue]);

  useEffect(() => {
    const checkAlarms = () => {
      const currentBid = getBidRate().toFixed(2);
      alarms.forEach((alarm) => {
        if (currentBid === alarm.value) {
          PushNotification.localNotification({
            channelId: 'default-channel-id',
            title: 'Alarm Triggered',
            message: `The ${alarm.type} price is now ${currentBid}, matching your set alarm!`,
            playSound: true,
            soundName: 'default',
            vibrate: true,
            vibration: 300,
          });
          Alert.alert('Alarm Triggered!', `The ${alarm.type} price is now ${currentBid}, matching your set alarm!`);
        }
      });
    };

    const alarmCheckInterval = setInterval(checkAlarms, 60000);
    return () => clearInterval(alarmCheckInterval);
  }, [alarms]);

  const getBidRate = () => {
    return value === 'gold' ? parseFloat(goldPrice.bid) : parseFloat(silverPrice.bid);
  };

  const calculateAlarmValue = () => {
    const currentBid = getBidRate();
    return (frozenAlarmValue !== null ? parseFloat(frozenAlarmValue) : currentBid) + inputValue;
  };

  const handleSetAlarm = () => {
    const newAlarm = {
      type: value,
      value: calculateAlarmValue().toFixed(2),
    };
    setAlarms([...alarms, newAlarm]);
    Alert.alert('Alarm Set!');
    setFrozenAlarmValue(getBidRate().toFixed(2));
  };

  const handleDeleteAlarm = (index) => {
    const updatedAlarms = alarms.filter((_, i) => i !== index);
    setAlarms(updatedAlarms);
  };

  const renderAlarmItem = ({ item, index }) => (
    <View style={styles.priceRow}>
      <Text style={styles.headerCell}>{item.type}</Text>
      <Text style={styles.priceCell}>{item.value} .د.إ</Text>
      <TouchableOpacity onPress={() => handleDeleteAlarm(index)}>
        <Icon name="delete" size={24} color="black" style={styles.iconStyle} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.logo}>
        <Text style={styles.logoTitle}>Future Gold</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.dateAndTime}>
          <View style={styles.timeBox}>
            <Icon name="access-time" size={24} color="#ffffff" style={styles.icon} />
            <View>
              <Text style={styles.todayText}>Today</Text>
              <Text style={styles.timeText}>{currentTime}</Text>
            </View>
          </View>
          <View style={styles.dateBox}>
            <Icon name="calendar-today" size={24} color="#ffffff" style={styles.icon} />
            <View>
              <Text style={styles.todayText}>Today</Text>
              <Text style={styles.dateText}>{currentDate}</Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, value === 'gold' && styles.activeButton]}
            onPress={() => setValue('gold')}
          >
            <Text style={styles.buttonText}>Gold</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, value === 'silver' && styles.activeButton]}
            onPress={() => setValue('silver')}
          >
            <Text style={styles.buttonText}>Silver</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image source={require('../Assets/test.png')} style={styles.image} />
        </View>
        <View style={styles.priceContainer}>
          <View style={styles.frozenValueContainer}>
            <Text style={styles.priceText}>{frozenAlarmValue} .د.إ</Text>
          </View>
          <View style={styles.frozenValueContainer}>
            <Text style={styles.priceText}>{getBidRate().toFixed(2)} .د.إ</Text>
          </View>
        </View>
        <View style={styles.frozenValueContainer}>
          <Text style={styles.priceText}>{calculateAlarmValue().toFixed(2)} .د.إ</Text>
        </View>
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            minimumValue={-30}
            maximumValue={30}
            step={1}
            value={inputValue}
            onValueChange={(value) => setInputValue(value)}
            thumbTintColor="#1f65ff"
            minimumTrackTintColor="transparent"
            maximumTrackTintColor="red"
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.setAlarmButton} onPress={handleSetAlarm}>
            <Text style={styles.buttonText}>Set Alarm</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={alarms}
          renderItem={renderAlarmItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.alarmsContainer}
          ItemSeparatorComponent={() => <View style={styles.separator} />} // Optional: Add a separator between items
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: 60,
    backgroundColor: '#6B5543',
    justifyContent: 'center',
    alignItems: 'center',
    
    marginBottom: 20,
  },
  logoTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  dateAndTime: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  timeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    padding: 10,
    backgroundColor: '#6B5543',
    borderColor: '#ffffff',
    borderWidth: 1,
  },
  dateBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    padding: 10,
    backgroundColor: '#F5F5F5',
    borderColor: '#ffffff',
    borderWidth: 1,
  },
  icon: {
    marginRight: 10,
    color: 'black',
  },
  timeText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  todayText: {
    color: 'black',
    fontSize: 18,
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#C2BCBC',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 1,
    width: '50%',
  },
  activeButton: {
    backgroundColor: '#C59975',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  priceContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    
  },
  frozenValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    height: 40,
    padding: 10,
    backgroundColor: '#6B5543',
    borderRadius: 5,

  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  sliderContainer: {
    width: '100%',
    marginBottom: 10,
    marginTop: 20,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  buttonContainer: {
    marginTop: 20,
    width: '80%',
  },
  setAlarmButton: {
    backgroundColor: '#C59975',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  alarmsContainer: {
    flexGrow: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10, 
    width: '90%', 
   
  },
  headerCell: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center', 
  },
  priceCell: {
    fontSize: 16,
    color: 'black',
    flex: 1,
    textAlign: 'center', 
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    width: '100%', 
  },
});


export default RateAlert;