var myIcon = L.icon({
    iconUrl: "./assets/images/icons-new/current-loc.png",
    iconSize: [38, 38],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});
    
var latlng;
var mymap;

document.getElementById('searchSend').addEventListener('click', function() {
	var q = document.getElementById('search_place').value;
	console.log(q)
	var url = "https://maps.googleapis.com/maps/api/place/textsearch/json?input=" + q + "&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyDpxCCTbvX5JvcRquE6SmSg7K44iYR-KVU"
	var request = new XMLHttpRequest();
	XMLHttpRequest.responseType = 'jsonp';
	request.open('GET', url,true);
	request.onload= function() {
		console.log("dfdf")
		if(request.status >=200 && request.status <400){
			var loc = JSON.parse(this.response);
			console.log(loc)
			newLocLat = loc.results[0].geometry.location.lat;
			newLocLng = loc.results[0].geometry.location.lng;
			console.log(newLocLat)
			latlngNewLoc = new L.LatLng(newLocLat,newLocLng);
			console.log(latlngNewLoc)
			L.Routing.control({
			waypoints: 
			[
				latlng,
				latlngNewLoc
				
			]
			}).addTo(mymap);
	} else {
		console.log('Sorry')
	}}
	request.send();
})

navigator.geolocation.watchPosition(function(postiton) {
latlng = new L.LatLng(postiton.coords.latitude, postiton.coords.longitude);

mymap = L.map('mapid').setView(latlng, 17)
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 20,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(mymap); 

var marker = L.marker(latlng,{icon: myIcon}).addTo(mymap);
// L.Routing.control({
// waypoints: 
// [
//     latlng,
//     L.latLng(13.01268, 80.236362)
// ]
// }).addTo(mymap);


},  (error) => {
	
	switch(error.code) {
		case error.PERMISSION_DENIED:
		console.log( "User denied the request for Geolocation.")
		break;
		case error.POSITION_UNAVAILABLE:
		console.log( "Location information is unavailable.")
		break;
		case error.TIMEOUT:
		console.log( "The request to get user location timed out.")
		break;
		case error.UNKNOWN_ERROR:
		console.log("An unknown error occurred.")
		break;
}
});