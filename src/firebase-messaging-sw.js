importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');
importScripts('secrets.js');

firebase.initializeApp({
  'messagingSenderId': self.config.messagingSenderId
});

const messaging = firebase.messaging();
