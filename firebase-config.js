// firebase-config.js

var firebaseConfig = {
    apiKey: "AIzaSyAZz2fQV5gU4x3YiPD7ugukmePYjHHLe00",
    authDomain: "aburobocon2023-point-counter.firebaseapp.com",
    databaseURL: "https://aburobocon2023-point-counter-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "aburobocon2023-point-counter",
    storageBucket: "aburobocon2023-point-counter.appspot.com",
    messagingSenderId: "620826094443",
    appId: "1:620826094443:web:3b56d75f49519c9b5f7a2e"
  };
  
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();