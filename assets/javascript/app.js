$(document).ready(function () {


    var config = {
        apiKey: "AIzaSyDjXRnoN9RAssmGns2tUEM4Sy2shYT4sSs",
        authDomain: "train-hw-527fc.firebaseapp.com",
        databaseURL: "https://train-hw-527fc.firebaseio.com",
        projectId: "train-hw-527fc",
        storageBucket: "train-hw-527fc.appspot.com",
        messagingSenderId: "612664790401"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    var trainName = "";
    var destination = "";
    var firstTrain = "";
    var frequency = "";