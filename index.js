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

exports.getItinerariesWithMaxTime = fucntion (itinerary, existingItineraries, radius, time, apiKey) {

	var nearItineraries = getItinerariesNearOurItinerary(itinerary, existingItineraries, radius);

	var itineraries = [];

	var startPoint = itinerary["from"]["lat"] + "," + itinerary["from"]["lon"];

	var tasks = nearItineraries.length;

	for (var i = 0; i < nearItineraries.length; i++) {
		var duration = 0;

		calculDistance.getDistances(
		  startPoint,  // Origin
		  nearItineraries[i]["from"]["lat"] + "," + nearItineraries[i]["from"]["lon"],  // Destination
		  "driving", // Mode
		  apiKey // Api Key
		).then(data => {
		  duration = data.rows[0].elements[0].duration.value;

			if (duration < time) {
				itineraries.push(data);
			}

			taskComplete();
		})
	}

	function taskComplete()
    {
        tasks--;
        if ( tasks <= 0 ) {
            console.log(itineraries);
			return itineraries;
        }
    }	
}
