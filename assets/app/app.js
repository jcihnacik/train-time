
var firebaseConfig = {
    apiKey: "AIzaSyBf6cQxtexOYagP8RqCz6AWZyV6PlPnxRo",
    authDomain: "train-time-34ef5.firebaseapp.com",
    databaseURL: "https://train-time-34ef5.firebaseio.com",
    projectId: "train-time-34ef5",
    storageBucket: "",
    messagingSenderId: "853622038609",
    appId: "1:853622038609:web:d4a1d7d2e3a02f3d771870"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

//on-click event for adding train via the submit button
$("#submit").on("click", function (event) {
    event.preventDefault();

    var addedName = $("#train-name-input").val().trim();
    var addedDestination = $("#destination-input").val().trim();
    var addedTime = $("#first-train-time-input").val().trim();
    var addedFrequency = $("#frequency-input").val().trim();

    var newTrain = {
        name: addedName,
        destination: addedDestination,
        time: addedTime,
        frequency: addedFrequency
    };

    database.ref().push(newTrain);

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val("");
    $("#frequency-input").val("");

});

/////////////////////////////////////////////////////////
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    var addedName = childSnapshot.val().name;
    var addedDestination = childSnapshot.val().destination;
    var addedTime = childSnapshot.val().time;
    var addedFrequency = childSnapshot.val().frequency;

    var nextArrival;
    var minutesAway;

    var addedTrain = moment(addedTime, "hh:mm");
        console.log("This is the added train: " + addedTrain);

    var timeDifference = moment().diff(moment(addedTrain), "minutes");
        console.log("This is the time difference: " + timeDifference);
        
    var remainingTime = timeDifference % addedFrequency;
    minutesAway = addedFrequency - remainingTime;
        console.log("This is how many minutes away: " + minutesAway);

    nextArrival = moment().add(minutesAway, "minutes");
    nextArrival = moment(nextArrival).format("hh:mm");
        console.log(nextArrival);




    var newRow = $("<tr>").append(
        $("<td>").text(addedName),
        $("<td>").text(addedDestination),
        $("<td>").text(addedFrequency),
        $("<td>").text(nextArrival),
        $("<td>").text(minutesAway),
    );


    $("#current-train-table > tbody").append(newRow);

});

///need to apply frequency starting at first time
//need to 
//need to read current time (moment.()), subtract difference from next arrival time







//https://console.firebase.google.com/project/train-time-34ef5/database/train-time-34ef5/data

