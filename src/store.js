import {applyMiddleware, createStore} from 'redux';
import reducers from './redux/reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './Saga';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// mount it on the Store
const store = createStore(reducers, applyMiddleware(sagaMiddleware));

// then run the saga
sagaMiddleware.run(rootSaga)

export default store;
