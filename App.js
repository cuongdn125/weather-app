import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {ActivityIndicator ,StyleSheet, Text, View,Platform, KeyboardAvoidingView, ImageBackground } from 'react-native';
import SearchInput from './components/SearchInput';
import getImageForWeather from './util/getImage';

import { fetchLocationId, fetchWeather } from './util/api';

export default function App() {
  const [location, setLocation] = useState('San Francisco');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [temperature, setTemperature] = useState(0);
  const [weather, setWeather] = useState('');

  const handleUpdateLocation = (city) => {
    setLoading(true);
    setLocation(city);
  }

  useEffect(() => {
    async function getData() {
      try {
        const locationId = await fetchLocationId(location);
        const { weather, temperature } = await fetchWeather(locationId,);
        setLoading(false);
        setError(false);
        setWeather(weather);
        setTemperature(temperature);
      }catch(err) {
        setError(true);
        setLoading(false);
      }
    }

    getData();
  },[location]);
  
  return (
    <KeyboardAvoidingView style={styles.container} >
      <StatusBar barStyle="light-content"/>
      <ImageBackground 
        source={getImageForWeather(weather)}
        style={styles.imageContainer}
        imageStyle={styles.image}      
      >
        <View style={styles.detailContainer}>
          <ActivityIndicator animating={loading} color="white"size="large"/>
          {!loading && (
            <View>
              {error && (
                <Text style={[styles.textStyle, styles.largeText]}>Could not load weather, pleasetrya different city.</Text>
              )}
              {/* {console.log("hello :",location, weather, temperature)} */}
              <Text style={[styles.textStyle, styles.largeText]}>{location}</Text>
              <Text style={[styles.textStyle, styles.smallText]}>{weather}</Text>
              <Text style={[styles.textStyle, styles.largeText]}>{`${Math.round(temperature)}`}</Text>
            </View>
          )
          }
          <SearchInput placeholder="Search input" onSubmit={handleUpdateLocation}/>
        </View>
        
        
        
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  textStyle: {
    textAlign: 'center',
    ...Platform.select({
      ios: {
        fontFamily: 'AvenirNext-Regular',
      },
      android: {
        fontFamily: 'Roboto',
      },
    }),
    color: 'white',
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  detailContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
