![Polytech Paris-sud](https://www.usinenouvelle.com/mediatheque/3/4/0/000268043_image_260x175.jpg)

# search-itinary-on-itinary
_version 1.0.0_

A module to search an itinary on another itinary with a max added time.

## Prerequisite
You need to obtain an api key. [How to obtain API key ?](https://developers.google.com/maps/documentation/distance-matrix/get-api-key)

## Install
```
npm install calcul-time-distances compare-itinerary search-itineraries-under-max-time
```

## Example
```javascript
// Import package
var searchItineraries = require("search-itineraries-under-max-time")

searchItineraries.getItinerariesWithMaxTime(
  <myItinerary>,  // The function will return all itineraries under the radius distance and the time from this itinerary
  <existingItineraries>,  // The itineraries where we want to search
  <radius>, // Max radius of the destination between our itinerary and the others
  <time>, // Max time between our itinerary and the others
  <API_key> // API Key
).then(data => {
  // Do something with data
  console.log(data)
})
```

## Returned value
```json

[{
   "destination_addresses" : [ "91400 Orsay, France" ],
   "origin_addresses" : [ "Paris, France" ],
   "rows" : [
      {
         "elements" : [
            {
               "distance" : {
                  "text" : "32,0 km",
                  "value" : 31962
               },
               "duration" : {
                  "text" : "38 minutes",
                  "value" : 2295
               },
               "status" : "OK"
            }
         ]
      }
   ],
   "status" : "OK"
},
{
   "destination_addresses" : [ "91400 Orsay, France" ],
   "origin_addresses" : [ "Paris, France" ],
   "rows" : [
      {
         "elements" : [
            {
               "distance" : {
                  "text" : "31,9 km",
                  "value" : 31856
               },
               "duration" : {
                  "text" : "39 minutes",
                  "value" : 2345
               },
               "status" : "OK"
            }
         ]
      }
   ],
   "status" : "OK"
}]
```
