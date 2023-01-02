import {all, fork} from 'redux-saga/effects';
import mySaga from './redux/saga';

export default function* rootSaga() {
  yield all([mySaga()]);
}
