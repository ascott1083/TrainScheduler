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

    $("#submit").on("click", function (event) {
        event.preventDefault();
        trainName = $("#nameInput").val().trim();
        destination = $("#destinationInput").val().trim();
        firstTrain = $("#traintimeInput").val().trim();
        frequency = $("#frequencyInput").val().trim();

        if (!trainName || !destination || !firstTrain || !frequency) {

            alert("Please add further details for new train");
        } else {

            $(".form-control").val("");
            console.log(name, destination, firstTrain, frequency);

            database.ref().push({

                trainName: trainName,
                destination: destination,
                firstTrain: firstTrain,
                frequency: frequency,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
            });
        }
    });

    database.ref().on("child_added", function (childSnapshot) {
        var trainData = childSnapshot.val();
        console.log(trainData.trainName);
        console.log(trainData.destination);
        console.log(trainData.firstTrain);
        console.log(trainData.frequency);

        var convertedTime = moment(trainData.firstTrain, "HH:mm").subtract(1, "years");
        var timeDifference = moment().diff(moment(convertedTime), "minutes");
        var timeLeft = timeDifference % trainData.frequency;
        var arrivalTime = trainData.frequency - timeLeft;
        
        var newTrain = moment().add(arrivalTime, "minutes");
        console.log("New Train",newTrain)
         newTrain = moment(newTrain).format("HH:mm");
         console.log('Updated new train', newTrain)


        var newRow = $("<tr>");
        newRow.append("<td>" + trainData.trainName + "</td>");
        newRow.append("<td>" + trainData.destination + "</td>");
        newRow.append("<td>" + trainData.frequency + "</td>");
        newRow.append("<td>" + newTrain + "</td>");
        newRow.append("<td>" + arrivalTime + "</td>");

        var tableBody = $("tbody")
        tableBody.append(newRow)

    });

})