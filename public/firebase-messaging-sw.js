importScripts("https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.9.1/firebase-messaging.js");

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

messaging.setBackgroundMessageHandler(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    title: payload.data.title,
    data: { state: payload.data.state },
    icon: '/images/icon-384.png'
  };


  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});

self.addEventListener('notificationclick', event => {
  console.log("notification click: ", event);
  const direction = "app/restaurants/details/19";
  const rootUrl = new URL('/', location).href + direction;
  event.notification.close();

  console.log(rootUrl)
  // Enumerate windows, and call window.focus(), or open a new one.
  event.waitUntil(
    clients.matchAll().then(matchedClients => {
      for (let client of matchedClients) {

        console.log(client.url)
        if (client.url === rootUrl) {
          return client.focus();
        }
      }
      return clients.openWindow("/" + direction);
    })
  );
});