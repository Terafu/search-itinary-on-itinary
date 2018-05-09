var compareItinerary = require ("compare-itinerary");
var calculDistance = require("calcul-time-distances")

function getItinerariesNearOurItinerary (itinerary, existingItineraries, radius) {

	var placeOne = itinerary["to"];
	var itineraries = [];

	for (var i = 0; i < existingItineraries.length; i++) {

		var placeTwo = existingItineraries[i]["to"];

		if (compareItinerary.isNear(placeOne, placeTwo, radius)) {

			itineraries.push(existingItineraries[i]);	
		}
	}

	return itineraries;
}

function getItinerariesWithMaxTime(itinerary, existingItineraries, radius, time){

	var nearItineraries = getItinerariesNearOurItinerary(itinerary, existingItineraries, radius);

	var itineraries = [];

	var startPoint = itinerary["from"]["lat"] + "," + itinerary["from"]["lon"];

	for (var i = 0; i < itineraries.length; i++) {
		var duration = 0;

		calculDistance.getDistances(
		  startPoint,  // Origin
		  itineraries[i]["from"]["lat"] + "," + itineraries[i]["from"]["lon"],  // Destination
		  "driving", // Mode
		  "AIzaSyD35qhFxfb4gzqB4a_egNd0z4JgmgCIUUY" // Api Key
		).then(data => {
		  duration = data.rows[0].elements[0].duration.value;

			if (duration < time) {
				itineraries.push(data);
			}
		})
	}

	console.log(itineraries);
	return itineraries;
}

var existingItineraries = [{id: 1, from: {lat: 48.766, lon: 2.169}, to: {lat: 48.709709, lon: 2.172026}},
			{id: 2, from: {lat: 15.455, lon: 20.346}, to: {lat: 30.112, lon: 35.069}},
			{id: 3, from: {lat: 16.316, lon: 19.245}, to: {lat: 10.367, lon: 20.985}},
			{id: 4, from: {lat: 14.346, lon: 20.119}, to: {lat: 29.026, lon: 34.399}}];
                        
var myItinerary = {from: {lat: 48.734388, lon: 2.207886}, to: {lat: 48.709709, lon: 2.172026}}; 

var radius = 20000; //the value in meters of the max distance betwin the base traject and the existing one.

getItinerariesWithMaxTime(myItinerary, existingItineraries, radius, 900);

