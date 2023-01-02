import {call, put, takeEvery} from 'redux-saga/effects';
import {
  GET_WEATHER_SUCCESS,
  GET_WEATHER_FAILED,
  WEATHER_FETCH_REQUESTED,
} from './actions/actions';
import Axios from 'axios';
const url = process.env.API_URL

const apiKey = 'e77460dfaa55e9e9c1642c52add1954f';

function* workGetWeatherFetch(action) {
  const {payload} = action;
  console.log('env',url)

  try {
    const uri = `https://api.openweathermap.org/data/2.5/weather?q=${payload}&appid=${apiKey}`;
    const response = yield Axios.get(uri);
    console.log('response', response.data);
    yield put({
      type: GET_WEATHER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: GET_WEATHER_FAILED,
      message: 'Please enter a valid city',
    });
  }
}

function* mySaga() {
  console.log('workGetWeatherFetch');
  yield takeEvery(WEATHER_FETCH_REQUESTED, workGetWeatherFetch);
}

export default mySaga;
