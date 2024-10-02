import { SafeAreaView, StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import axios from 'axios';

const { width } = Dimensions.get('window');

const Spot = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [goldPrice, setGoldPrice] = useState({
    bid: '1000.65',
    ask: '1000.56',
    Gram: '80.23'  
  });
  const [silverPrice, setSilverPrice] = useState({
    bid: '22.00',
    ask: '22.50',
    Gram: '0.91'  
  });

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const date = now.toLocaleDateString();

      setCurrentTime(time);
      setCurrentDate(date);
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 60000);
    const priceIntervalId = setInterval(fetchLivePrices, 60000);

    fetchLivePrices(); 

    return () => {
      clearInterval(intervalId);
      clearInterval(priceIntervalId);
    };
  }, []);

  const fetchLivePrices = async () => {
    try {
      // Fetch gold prices
      const goldResponse = await axios.get('https://www.goldapi.io/api/XAU/AED', {
        headers: { 'x-access-token': '' }
      });

      // Fetch silver prices
      const silverResponse = await axios.get('https://www.goldapi.io/api/XAG/AED', {
        headers: { 'x-access-token': '' }
      });

      setGoldPrice({
        bid: goldResponse.data.bid.toFixed(2),
        ask: goldResponse.data.ask.toFixed(2),
        Gram: goldResponse.data.price_gram_24k.toFixed(2),
      });

      setSilverPrice({
        bid: silverResponse.data.bid.toFixed(2),
        ask: silverResponse.data.ask.toFixed(2),
        Gram: silverResponse.data.price_gram_24k.toFixed(2),
      });
    } catch (error) {
      console.error('Error fetching live prices:', error);
    }
  };

  const calculatePrice995 = (price24k) => {
    return (price24k * (995 / 999)).toFixed(2);
  };

  // Calculate the price for 995 gold
  const price995 = goldPrice.Gram ? calculatePrice995(parseFloat(goldPrice.Gram)) : 'N/A';

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
          <View style={styles.livePrice}>
            <Text style={styles.livePriceText}>Live Gold and Silver Price</Text>
          </View>
          <View style={styles.priceContainer}>
            <View style={styles.priceItem}>
              <Text style={styles.priceLabel}>Gold Bid Price</Text>
              <View style={styles.priceBox}>
                <Text style={styles.priceValue}>{goldPrice.bid} .د.إ</Text>
              </View>
            </View>
            <View style={styles.priceItem}>
              <Text style={styles.priceLabel}>Gold Ask Price</Text>
              <View style={styles.priceBox}>
                <Text style={styles.priceValue}>{goldPrice.ask} .د.إ</Text>
              </View>
            </View>
          </View>
          <View style={styles.priceContainer}>
            <View style={styles.priceItem}>
              <Text style={styles.priceLabel}>Silver Bid Price</Text>
              <View style={styles.priceBox}>
                <Text style={styles.priceValue}>{silverPrice.bid} .د.إ</Text>
              </View>
            </View>
            <View style={styles.priceItem}>
              <Text style={styles.priceLabel}>Silver Ask Price</Text>
              <View style={styles.priceBox}>
                <Text style={styles.priceValue}>{silverPrice.ask} .د.إ</Text>
              </View>
            </View>
          </View>

          <View style={styles.tableContainer}>
            <View style={styles.headerRow}>
              <Text style={[styles.cell, styles.header, styles.assetsHeader]}>Assets</Text>
              <Text style={[styles.cell, styles.header, styles.weightHeader]}>Weight</Text>
              <Text style={[styles.cell, styles.header, styles.priceHeader]}>Price AED</Text>
            </View>

            <View style={styles.body}>
              <View style={styles.column}>
                <Text style={[styles.cell, styles.assetsCell]}>Gold 999</Text>
                <Text style={[styles.cell, styles.assetsCell]}>Gold 999</Text>
                <Text style={[styles.cell, styles.assetsCell]}>Gold 995</Text>
                <Text style={[styles.cell, styles.assetsCell]}>Gold 999</Text>
                <Text style={[styles.cell, styles.assetsCell]}>Silver</Text>
              </View>
              <View style={styles.column}>
                <Text style={[styles.cell, styles.weightCell]}>1 GM</Text>
                <Text style={[styles.cell, styles.weightCell]}>1 KG</Text>
                <Text style={[styles.cell, styles.weightCell]}>1 KG</Text>
                <Text style={[styles.cell, styles.weightCell]}>1 TTB</Text>
                <Text style={[styles.cell, styles.weightCell]}>1 KG</Text>
              </View>
              <View style={styles.column}>
                <Text style={[styles.cell, styles.priceCell]}>{goldPrice.Gram} .د.إ</Text>
                <Text style={[styles.cell, styles.priceCell]}>{(goldPrice.Gram * 1000).toFixed(2)} .د.إ</Text>
                <Text style={[styles.cell, styles.priceCell]}>{(price995 * 1000).toFixed(2)} .د.إ</Text>
                <Text style={[styles.cell, styles.priceCell]}>{(goldPrice.Gram * 116.640).toFixed(2)} .د.إ</Text>
                <Text style={[styles.cell, styles.priceCell]}>{(silverPrice.Gram * 1000).toFixed(2)} .د.إ</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#ffff',
      
    },
    scrollContainer: {
      paddingBottom: 20,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingBottom: 20,
    },
    logo: {
      width: '100%',
      height: 60,
      backgroundColor: '#5E422D',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
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
      width: '48%',
      padding: 10,
      backgroundColor: '#6B5543',
      borderColor: '#ffffff',
      borderWidth: 1,
      borderRadius: 8,
    },
    dateBox: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '48%',
      padding: 10,
      backgroundColor: '#fff',
      borderColor: '#000',
      borderWidth: 1,
      borderRadius: 8,
    },
    icon: {
      marginRight: 15,
      color: 'black',
    },
    todayText: {
      fontSize: 14,
      color: 'black',
    },
    timeText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#ffffff',
    },
    dateText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'black',
    },
    livePrice: {
      backgroundColor: '#5E422D',
      padding: 10,
      borderRadius: 8,
      marginBottom: 20,
      width: '100%',
      alignItems: 'center',
    },
    livePriceText: {
      color: '#ffffff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    priceContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
      width: '100%',
      
    },
    priceItem: {
      width: '48%',
      backgroundColor: '#F5F5F5',
      borderRadius: 8,
      padding: 10,
      alignItems: 'center',
    },
    priceLabel: {
      fontSize: 14,
      color: 'black',
      marginBottom: 5,
      
    },
    priceBox: {
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 10,
      width: '100%',
      alignItems: 'center',
    },
    priceValue: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'black',
    },
    tableContainer: {
      marginTop: 20,
      width: '100%',
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    header: {
      fontWeight: 'bold',
      fontSize: 14,
    },
    assetsHeader: {
      color: 'black',
      backgroundColor: '#C59975',
      width: '32%',
      fontSize: 18,
      fontWeight:"bold",
      textAlign: 'center',
      borderColor: '#000',
      borderWidth: 1,
      borderRadius: 2,
    },
    weightHeader: {
      color: 'black',
      backgroundColor: '#C59975',
      width: '32%',
      fontSize: 18,
      fontWeight:"bold",
      textAlign: 'center',
      borderColor: '#000',
      borderWidth: 1,
      borderRadius: 2,
    },
    priceHeader: {
      color: 'black',
      backgroundColor: '#C59975',
      width: '32%',
      fontSize: 18,
      fontWeight:"bold",
      textAlign: 'center',
      borderColor: '#000',
      borderWidth: 1,
      borderRadius: 2,
    },
    body: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      
    },
    column: {
      width: '32%',
      borderColor: '#000',
      borderWidth: 1,
      borderRadius: 2,
      paddingHorizontal: 5,
    },
    cell: {
      fontSize: 15,
      fontWeight:"bold",
      paddingVertical: 10,
      textAlign: 'center',
    },
    assetsCell: {
      color: 'black',
      fontWeight:"bold",
      textAlign: 'center',
    },
    weightCell: {
      color: 'black',
      textAlign: 'center',
    },
    priceCell: {
      color: 'black',
      textAlign: 'left',
      
    },
  });
  export default Spot;
  