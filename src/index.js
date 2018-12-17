import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import axios from 'axios';
import { takeEvery, call, put } from 'redux-saga/effects';

//saga to get animals
function* fetchAnimals() {
    const zooAnimals = yield call(axios.get, '/zoo');
    yield put({type: 'SET_ZOO_ANIMALS', payload: zooAnimals.data})
}

//saga to get classes (needed for select input when adding new animal)
function* fetchClasses() {
    const animalClasses = yield call(axios.get, 'zoo/classes');
    yield put({type: 'SET_CLASSES', payload: animalClasses.data})
}

//saga to post new animal to db async
function* addAnimal(action) {
    try {
        yield call(axios.post, '/zoo', action.payload);
        alert('Successfully added new animal!');
        yield put({ type: 'GET_ZOO_ANIMALS' });
    } catch (err) {
        alert('Something went wrong. Please try again.');
        console.log(err);
    }
    
}
//saga to delete animal from db
function* deleteAnimal(action){
    yield call(axios.delete, `/zoo/${action.payload}`)
    yield put({ type: 'GET_ZOO_ANIMALS'})
}

// Your saga should listen for the action type of `GET_ZOO_ANIMALS`
function* rootSaga() {
    yield takeEvery('GET_ZOO_ANIMALS', fetchAnimals)
    yield takeEvery('GET_ANIMAL_CLASSES', fetchClasses)
    yield takeEvery('ADD_ANIMAL', addAnimal)
    yield takeEvery('DELETE_ANIMAL', deleteAnimal)
    
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store class and number of unique animals in that class
const zooAnimals = (state = [], action) => {
    switch (action.type) {
        case 'SET_ZOO_ANIMALS':
            return action.payload;
        default:
            return state;
    }
}

const animalClasses = (state = [], action) => {
    switch (action.type) {
        case 'SET_CLASSES':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        zooAnimals,
        animalClasses,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
