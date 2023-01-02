import {
  GET_WEATHER_SUCCESS,
  GET_WEATHER_FAILED,
  WEATHER_FETCH_REQUESTED,
} from '../actions/actions';

const initialStatus = {
  code: 100,
  weather: [],
  message: '',
};
const weatherReducer = (state = initialStatus, action) => {
  switch (action.type) {
    case WEATHER_FETCH_REQUESTED:
      return {
        ...state,
        message: '',
        code: 100,
      }
    case GET_WEATHER_SUCCESS:
      return {
        ...state,
        code: 200,
        weather: [action.payload, ...state.weather.slice(0, 4)],
        message: '',
      };
    case GET_WEATHER_FAILED:
      return {
        ...state,
        code: 400,
        message: action.message,
      };
    default:
      return state;
  }
};

export default weatherReducer;
