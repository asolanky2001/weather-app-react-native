export const WEATHER_FETCH_REQUESTED = 'USER_FETCH_REQUESTED';
export const GET_WEATHER_SUCCESS = 'GET_WEATHER_SUCCESS';
export const GET_WEATHER_FAILED = 'GET_WEATHER_FAILED';

export const fetchWeather = payload => ({
  type: WEATHER_FETCH_REQUESTED,
  payload: payload,
});
