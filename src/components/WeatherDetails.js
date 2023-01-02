import React, {useEffect} from 'react';
import {
  Text,
  ImageBackground,
  ScrollView,
  Dimensions,
  View,
  Animated,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';

const WeatherDetails = ({navigation}) => {
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;

  let rotateValue = new Animated.Value(0);
  const RotateData = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const weather = useSelector(state => state.weatherReducer?.weather);
  const latestSearch = weather[0];

  const imageRotate = () => {
    rotateValue.setValue(0);
    Animated.timing(rotateValue, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: false,
    }).start(() => imageRotate());
  };

  useEffect(() => {
    setTimeout(() => {
      imageRotate();
    }, 3000);
  });

  const degree = Math.floor(latestSearch?.main?.temp - 273.15);

  return (
    <ScrollView style={{position: 'absolute'}}>
      <ImageBackground
        style={{
          height: screenHeight,
          width: screenWidth,
        }}
        source={{
          uri: 'https://images.pexels.com/photos/2680270/pexels-photo-2680270.jpeg?cs=srgb&dl=pexels-mudassir-ali-2680270.jpg&fm=jpg',
        }}>
        <View
          style={{
            marginVertical: 50,
          }}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Text style={{color: '#000'}}>Back</Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
            }}>
            <View style={{flex: 5, paddingVertical: 15}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.tempFont}>{degree}</Text>
                <Text style={[styles.tempFont, {fontWeight: '400'}]}>
                  &deg;C
                </Text>
              </View>
              <View>
                <Text style={styles.cityFont}>{latestSearch?.name}</Text>
              </View>
            </View>
            <Animated.Image
              style={{
                height: 120,
                width: 120,
                transform: [
                  {
                    rotate: RotateData,
                  },
                ],
              }}
              source={require('../assets/Images/sun.png')}
            />
          </View>
          <View style={styles.detailView}>
            <View style={styles.detailSubView}>
              <Text style={styles.detailText}>Humidity: </Text>
              <Text style={{fontSize: 16}}>
                {latestSearch?.main?.humidity}%
              </Text>
            </View>
            <View style={styles.detailSubView}>
              <Text style={styles.detailText}>Wind Speed: </Text>
              <Text style={{fontSize: 16}}>
                {latestSearch?.wind?.speed} km/h
              </Text>
            </View>
            <View style={styles.detailSubView}>
              <Text style={styles.detailText}>Visibility: </Text>
              <Text style={{fontSize: 16}}>{latestSearch?.visibility} km</Text>
            </View>
            <View style={styles.detailSubView}>
              <Text style={styles.detailText}>Pressure: </Text>
              <Text style={{fontSize: 16}}>
                {latestSearch?.main?.pressure} mb
              </Text>
            </View>
          </View>
        </View>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{
            justifyContent: 'center',
            paddingHorizontal: 60,
          }}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={300}
          decelerationRate="fast"
          pagingEnabled>
          {weather.map((item, index) => {
            return (
              <View style={styles.historyMainView}>
                <View style={styles.historySubView}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.tempFont}>
                      {Math.floor(item.main.temp - 273.15)}
                    </Text>
                    <Text style={[styles.tempFont, {fontWeight: '400'}]}>
                      &deg;C
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.cityFont}>{item.name}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </ImageBackground>
    </ScrollView>
  );
};
export default WeatherDetails;

const styles = StyleSheet.create({
  historyMainView: {
    width: 200,
    borderWidth: 1,
    height: '70%',
    marginHorizontal: 25,
    borderColor: '#FFF',
    borderRadius: 10,
    justifyContent: 'center',
  },
  historySubView: {
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tempFont: {
    fontSize: 45,
    fontWeight: '500',
    color: '#FFF',
  },
  cityFont: {
    fontWeight: '400',
    fontSize: 20,
    color: '#FFF',
  },
  detailText: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 30,
  },
  detailSubView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailView: {
    backgroundColor: '#FFFFFF',
    width: '85%',
    height: '42%',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 30,
    marginVertical: 50,
  },
  backButton: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginHorizontal: 20,
  },
});
