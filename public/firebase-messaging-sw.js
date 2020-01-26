importScripts("https://www.gstatic.com/firebasejs/7.6.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.6.1/firebase-messaging.js");

var firebaseConfig = {
    apiKey: "AIzaSyBIOzolcjUlgx5x5ca3zCg3DBPwYftV-kY",
    authDomain: "test-96cdc.firebaseapp.com",
    databaseURL: "https://test-96cdc.firebaseio.com",
    projectId: "test-96cdc",
    storageBucket: "test-96cdc.appspot.com",
    messagingSenderId: "890647037957",
    appId: "1:890647037957:web:9bf7066436852592d3346c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
console.log("Started service worker");