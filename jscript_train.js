// Initialize Firebase
var config = {
  apiKey: "AIzaSyBxiVokpEo348IDj3IgD_1Eix5eZqlSjqQ",
  authDomain: "train-time-607e8.firebaseapp.com",
  databaseURL: "https://train-time-607e8.firebaseio.com",
  projectId: "train-time-607e8",
  storageBucket: "train-time-607e8.appspot.com",
  messagingSenderId: "162456693707"
};
firebase.initializeApp(config);
// Working varilables are initialized
var currentTime = "";
var destination = "";
var startTime = "";
var frequency = "";
var nextArrival = "";
var minutesAway = "";
// Function to get the current time and place into HTML
function getCurrentTime() {
  currentTime = moment().format("HH:mm");
  $("#time").text(currentTime);
};
// Function that calculates the Next Arrival and the Minutes Away
function commingSoon() {
  var currentTimeMinute = moment.duration(currentTime).asMinutes();
  var startTimeMinute = moment.duration(startTime).asMinutes();
  var theTimeMinutes = currentTimeMinute - startTimeMinute;
  var usedMinutes = theTimeMinutes % frequency;
  usedMinutes = parseInt(usedMinutes);
  minutesAway = frequency - usedMinutes;
  nextArrival = currentTimeMinute + minutesAway;
  var hr = nextArrival / 60;
  hr = parseInt(hr);
  if (hr === 0) {
    hr = 00;
  }
  else if (hr > 0 && hr < 10) {
    hr = "0" + hr;
  }
  var mn = nextArrival % 60;
  mn = parseInt(mn);
  if (mn === 0) {
    mn = 00;
  }
  else if (mn > 0 && mn < 10){
    mn = "0" + mn;
  }
  nextArrival = hr + ":" + mn;
};
// Click event - Submit button which loads varibles and creates firebase entry
$("#add-train").on("click", function(event) {
  event.preventDefault();
  getCurrentTime();
  commingSoon();
	destination = $("#destination-input").val().trim();
	startTime = $("#start-time-input").val().trim();
	frequency = $("#frequency-input").val().trim();
  currentTime = $("#frequency-input").val().trim();

  firebase.database().ref().push({
  	destination:destination,
  	startTime:startTime,
  	frequency:frequency,
    nextArrival:nextArrival,
    minutesAway:minutesAway
  });
});
// Firebase function which retrives entry and places them into HTML
firebase.database().ref().on("child_added", function(snapshot) {
  $("#destination").append("<p>" + snapshot.val().destination + "</p>");
  $("#arrival-time").append("<p>" + snapshot.val().nextArrival + "</p>");
  $("#minutes-away").append("<p>" + snapshot.val().minutesAway + "</p>");
  $("#trip-time").append("<p>" + snapshot.val().frequency + "</p>");
});
// Function to get current time
getCurrentTime();
