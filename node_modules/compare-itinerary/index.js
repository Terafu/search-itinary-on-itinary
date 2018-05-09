function getDistanceFromLatLonInKm(p1, p2) {
	var R = 6371; // Radius of the earth in km
	var dLat = deg2rad(p2["lat"] - p1["lat"]);  // deg2rad below
	var dLon = deg2rad(p2["lon"] - p1["lon"]);
	var a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(p1["lat"])) * Math.cos(deg2rad(p2["lat"])) *
		Math.sin(dLon / 2) * Math.sin(dLon / 2)
		;
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c; // Distance in km
	return d;
}

function deg2rad(deg) {
	return deg * (Math.PI / 180);
}

exports.getSameTrajects = function (itinerary, data, r) {
	var trajects = [];
	for (var i = 0; i < data.length; i++) {
		if (getDistanceFromLatLonInKm(itinerary["from"], data[i]["from"]) < (r / 1000) && getDistanceFromLatLonInKm(itinerary["to"], data[i]["to"]) < (r / 1000)) {
			trajects.push(data[i]);
		}
	}
	return trajects;
};

exports.isNear = function (place1, place2, r) {
	if (getDistanceFromLatLonInKm(place1, place2) < (r / 1000)) {
		return true;
	}
	return false;
};
