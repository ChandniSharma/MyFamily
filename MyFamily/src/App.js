import React, {Component} from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {View, Text} from 'react-native';
import reducers from './reducers';
import firebase from 'firebase';
import LoginForm from './LoginForm';
import ReduxThunk from 'redux-thunk';
import Router from './components/Router';

export default class App extends Component{
    componentWillMount(){
        // Initialize Firebase
            const config = {
                apiKey: "AIzaSyAbkO-qTXWvGWnfzqoFpqppFLUUdAieWlE",
                authDomain: "managerredux-ea9d1.firebaseapp.com",
                databaseURL: "https://managerredux-ea9d1.firebaseio.com",
                projectId: "managerredux-ea9d1",
                storageBucket: "managerredux-ea9d1.appspot.com",
                messagingSenderId: "23471623840"
  };
  firebase.initializeApp(config);
    }
    
    render(){
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
        return(
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}