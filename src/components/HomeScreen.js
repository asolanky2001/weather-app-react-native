import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Dimensions,
  Text,
  TextInput,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchWeather} from '../redux/actions/actions';

const HomeScreen = ({navigation}) => {
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;

  const [searchedCity, setSearchedCity] = useState('');

  const dispatch = useDispatch();
  const code = useSelector(state => state.weatherReducer.code);

  const handleCitySearch = text => {
    console.log('eventValue', text.nativeEvent.text);
    setSearchedCity(text.nativeEvent.text);
  };

  useEffect(() => {
    // eslint-disable-next-line no-debugger
    debugger;
    if (code === 200) {
      navigation.navigate('WeatherDetails');
    } else if (code === 400) {
      alert('You have entered invalid city');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  const handleSeach = () => {
    if (searchedCity) {
      dispatch(fetchWeather(searchedCity));
      setSearchedCity('');
    } else {
      alert('Enter a valid city');
    }
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} />
      <ScrollView style={{position: 'absolute'}}>
        <ImageBackground
          style={{
            height: screenHeight,
            width: screenWidth,
          }}
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNzCPayKn90GI-RpjDgaB_fsiMaxVBizEonA&usqp=CAU',
          }}>
          <View style={styles.mainView}>
            <Text
              style={{
                fontSize: 28,
                fontWeight: '700',
                color: '#FFFFFF',
              }}>
              Weather Report
            </Text>
          </View>
          <View>
            <TextInput
              style={styles.textInput}
              placeholderTextColor="#C5CFCD"
              placeholder="Enter a valid city"
              onChange={text => handleCitySearch(text)}
              value={searchedCity}
            />
          </View>
          <View style={styles.buttonView}>
            <TouchableOpacity onPress={() => handleSeach()}>
              <Text style={styles.searchButton}>Search</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  searchButton: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 22,
  },
  mainView: {
    marginVertical: 130,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    color: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 20,
    margin: 12,
    borderWidth: 2,
    borderColor: '#C5CFCD',
    fontSize: 22,
  },
  buttonView: {
    marginVertical: 40,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
