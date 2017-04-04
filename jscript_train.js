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

var currentTime = "";
var destination = "";
var startTime = "";
var frequency = "";

currentTime = moment().format("HH:mm");
$("#time").text(currentTime);

var currentTimeMinute = moment.duration(currentTime).asMinutes();
console.log(currentTimeMinute);
var beginTime = "02:35";
var beginTimeMinute = moment.duration(beginTime).asMinutes();
console.log(beginTimeMinute);
var theTime = currentTimeMinute - beginTimeMinute;
console.log(theTime);
var hr = theTime / 60;
hr = parseInt(hr);
var mn = theTime % 60;
mn = parseInt(mn);
console.log(hr+":"+mn);

$("#add-train").on("click", function(event) {
  event.preventDefault();
	destination = $("#destination-input").val().trim();
	startTime = $("#start-time-input").val().trim();
	frequency = $("#frequency-input").val().trim();

	console.log(destination);
	console.log(startTime);
	console.log(frequency);

  firebase.database().ref().push({
  	destination:destination,
  	startTime:startTime,
  	frequency:frequency
  });
});

firebase.database().ref().on("child_added", function(snapshot) {
  $("#destination").append("<p>"+snapshot.val().destination+"</p>");
  $("#arrival-time").append("<p>"+snapshot.val().destination+"</p>");
  $("#minutes-away").append("<p>"+snapshot.val().destination+"</p>");
  $("#trip-time").append("<p>"+snapshot.val().frequency+"</p>");
});

//firebase.database().ref().on("value", function(snapshot) {
//  $("#destination").html(snapshot.val().destination);
//  $("#arrival-time").html(snapshot.val().destination);
//  $("#minutes-away").html(snapshot.val().destination);
//  $("#trip-time").html(snapshot.val().frequency);
//});

