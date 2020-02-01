import React from 'react';
import ScreenHandler from './components/ScreenHandler';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/messaging';

class App extends React.Component {

  fbToken = "";

  render() {
    return (
        <div className="App">
          <ScreenHandler fbToken={this.fbToken}/>
        </div>
    );
  }

  setToken(token) {
    this.fbToken = token;
    this.forceUpdate();
  }

  componentDidMount() {
    console.log("mount");
    if (firebase.messaging.isSupported()) {
      var firebaseConfig = {
        apiKey: "AIzaSyBIOzolcjUlgx5x5ca3zCg3DBPwYftV-kY",
        authDomain: "test-96cdc.firebaseapp.com",
        databaseURL: "https://test-96cdc.firebaseio.com",
        projectId: "test-96cdc",
        storageBucket: "test-96cdc.appspot.com",
        messagingSenderId: "890647037957",
        appId: "1:890647037957:web:9bf7066436852592d3346c"
      };
      firebase.initializeApp(firebaseConfig);
    
      var app = this;

      const messaging = firebase.messaging();
      messaging.requestPermission()
      .then(function() {
        console.log('Have Permission');
        return messaging.getToken();
      })
      .then(function(token) {
        console.log(token);
        app.setToken(token);
      }).catch(function(err) {
        console.log(err);
      });
    
      messaging.onMessage(function (payload) { 
        console.log(payload);
      });
    }
  }
}

export default App;