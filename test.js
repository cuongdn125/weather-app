import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {ActivityIndicator ,StyleSheet, Text, View,Platform, KeyboardAvoidingView, ImageBackground } from 'react-native';
import SearchInput from './components/SearchInput';
import getImageForWeather from './util/getImage';

import { fetchLocationId, fetchWeather } from './util/api';

export default class App extends React.Component {

  state = {
    location: '',
    loading: false,
    error: false,
    temperature: 0,
    weather: '',
  }

  componentDidMount() {
    this.handleUpdateLocation('San Francisco');
  }

   handleUpdateLocation = (city) => {
     if(!city) return;
      this.setState({loading: true}, async () => {
        try {
          const locationId = await fetchLocationId(city);
          const { location, weather, temperature } = await fetchWeather(locationId);
          this.setState({
            loading: false,
            error: false,
            location, weather, temperature ,
          })
        }catch(err) {
          this.setState({
            loading: false,
            error: true,
          })
        }
    })
    
  }
  render() {
    const{ loading, error, location, weather, temperature }=this.state;
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
                {/* {console.log('hello')} */}
                <Text style={[styles.textStyle, styles.largeText]}>{location}</Text>
                <Text style={[styles.textStyle, styles.smallText]}>{weather}</Text>
                <Text style={[styles.textStyle, styles.largeText]}>{`${Math.round(temperature)}`}</Text>
              </View>
            )
            }
            <SearchInput placeholder="Search input" onSubmit={this.handleUpdateLocation}/>
          </View>
          
          
          
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
  
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
