import React from 'react';
import ScreenHandler from './components/ScreenHandler';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/messaging';
import MessageListener from './MessageListener';

class App extends React.Component {

  fbToken = "";
  messageListener = new MessageListener();

  render() {
    return (
        <div className="App">
          <ScreenHandler fbToken={this.fbToken} messageListener={this.messageListener}/>
        </div>
    );
  }

  setToken(token) {
    this.fbToken = token;
    console.log(token);
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
      messaging.usePublicVapidKey("BMJ-dBS0EPnykDWroTRbq8rcNq6Yh2NHHLxAAerrZQk67sdvDlbOTY_WR-4cyoxjeMN6JlHsDP6sohMKu8ap784");
      Notification.requestPermission()
      .then(function() {
        console.log('Permission ' + Notification.permission);
        var token = messaging.getToken();
        console.log(token);
        return token;
      })
      .then(function(token) {
        console.log(token);
        app.setToken(token);
      }).catch(function(err) {
        console.log(err);
      });
    
      messaging.onMessage((payload) => {
        console.log('Message received. ', payload);
        this.messageListener.messageReceived(payload.data);
      });
    }
  }
}

export default App;