var hospiData;
var policeData;
var guideData;
var parkingData;
var locationData;

document.getElementById('search_place').addEventListener('keyup',function(event){
	event.preventDefault();
	if (event.keyCode === 13) {
		document.getElementById("searchSend").click();
	  }

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
				
			],
			fitSelectedRoutes: 'smart'
			}).addTo(mymap);
			mymap.setZoom(14);
	} else {
		console.log('Sorry')
	}}
	request.send();
})


navigator.geolocation.watchPosition(function(postiton) {
latlng = new L.LatLng(postiton.coords.latitude, postiton.coords.longitude);
mymap = L.map('mapid').setView(latlng, 17)
console.log('navigate');
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 20,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(mymap); 

L.marker(latlng,{icon: myIcon}).addTo(mymap);

	for(var i=0;i<hospiData.length;i++){
		var latlng1 = new L.LatLng(parseFloat(hospiData[i].latitude), parseFloat(hospiData[i].longitude));
		var html = "<h4>" + hospiData[i].hospital_name +" </h4><p>"+ "Address: " + hospiData[i].address+"</p><p>Phone No: " + hospiData[i].phone_number +"</p>";
		if(hospiData[i].ambulance_service == 1){
			html += "<p>Ambulance service: Available";
			html+= "<div><button class='material-raised-button'>Avail</button></div>";
		}
		else	
		html += "<p>Ambulance service: Unavailable";
		L.marker(latlng1,{icon: hospitalMarker}).addTo(mymap).bindPopup(html);
		// function onMapClick(e){
		// 	popup.setLatLng(latlng1).setContent(html).openOn(mymap)
		// }
		// mymap.on('click',onMapClick);
	}

	for(var i=0;i<policeData.length;i++){
		var latlng = new L.LatLng(parseFloat(policeData[i].latitude), parseFloat(policeData[i].longitude));
		var html = "<h4>Station: "+ policeData[i].station_name + "</h4><p>Region: " + policeData[i].region + "</p><p>Address: "+ policeData[i].address + "</p><p>Phone No:" + policeData[i].phone_number +"</p>";
		html+= "<div><button data-toggle='modal' data-target='#exampleModalLong' class='material-raised-button'>Avail</button></div>"
		new L.marker(latlng,{icon: policeStationMarker}).addTo(mymap).bindPopup(html);
	}

	for(var i=0;i<guideData.length;i++){
		var latlng = new L.LatLng(parseFloat(guideData[i].latitude), parseFloat(guideData[i].longitude));
		var html  = "<h4>Guide Name: " + guideData[i].guide_name +"</h4><p>Phone No: " + guideData[i].phone_number + "</p><p>Known Languages: " + guideData[i].languages_known + "<\p>";
		if(guideData[i].is_active == 1){
			html += "<p>Active</p>";
			html+= "<div><button data-toggle='modal' data-target='#exampleModalLong' class='material-raised-button'>Avail</button></div>";
		}
		else
			html += "<p>Inactive</p>";
		new L.marker(latlng,{icon: guideMarker}).addTo(mymap).bindPopup(html);
	}

	for(var i=0;i<locationData.length;i++){
		var latlng = new L.LatLng(parseFloat(locationData[i].latitude), parseFloat(locationData[i].longitude));
		var html = "<h4>" + locationData[i].place_name +"</h4><p>Services provided: " + locationData[i].services_provided+"</p><p>Crowd Density: " + locationData[i].crowd_density + "</p><p>Reviews: <i>" + locationData[i].reviews + "</i></p>";
		html+= "<div><i><div style='font-size: 14px;'>Services Available: Wheelchair</div></i><br/><button data-toggle='modal' data-target='#exampleModalLong' class='material-raised-button'>Avail</button></div>";
		
		if(locationData[i].is_available ==  1)
			html += "<p>Status: <b>Open</b></p>";
		else	
			html += "<p>Status: <b>Closed</b></p>";
		L.marker(latlng,{icon: locationsMarker}).addTo(mymap).bindPopup(html);
	}

	for(var i=0;i<parkingData.length;i++){
		var latlng = new L.LatLng(parseFloat(parkingData[i].latitude), parseFloat(parkingData[i].longitude));
		var html = "<h4>Parking Location: " + parkingData[i].place_name + "</h4><p>No of lots: "+ parkingData[i].no_of_lots + "</p><p>Used lots: " + parkingData[i].slots_occupied + "</p>";
		html+= "<div><button data-toggle='modal' data-target='#exampleModalLong' class='material-raised-button'>Avail</button></div>"
		L.marker(latlng,{icon: parkingMarker}).addTo(mymap).bindPopup(html);
	}

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


// function createButton(label, container) {
//     var btn = L.DomUtil.create('button', '', container);
//     btn.setAttribute('type', 'button');
//     btn.innerHTML = label;
//     return btn;
// }


// mymap.on('click', function(e) {
//     var container = L.DomUtil.create('div'),
//         destBtn = createButton('Go to this location', container);
// 	console.log(e.latlng);
//     L.popup()
//         .setContent(container)
//         .setLatLng(e.latlng)
//         .openOn(mymap);
// })

//######## Real time change of markers #######


//  var marker;
// mymap.on('click', function (e) {
//     if (marker) { // check
//         map.removeLayer(marker); // remove
//     }
//     marker = new L.Marker(e.latlng); // set
// }); 


var serverURL = 'http:localhost:8000/api/';

var lat = 12.9904;
var lng = 80.2171;

var latStr = lat.toString();
var lngStr = lng.toString();

var appendHospitalDetails = function(){

	$.ajax({
		type: "POST",
		url: serverURL+"hospital/details/",
		async: true,
		data: {
			'latitude': latStr,
			'longitude': lngStr
		},
		success: function (data) {
			if(data.status_code==200){
				hospiData = data.data;
				var len = data.data.length;
				len = len > 3 ? 3 : len;
				for(var i=0; i<len; i++) {
					var row = data['data'][i];
					var ambulance_service = 'Unavailable';
					if(row['ambulance_service']==true){
						ambulance_service = 'Available';
					}
					$('#hospitalTable').append(
						`<tr>
							<th scope="row">${i+1}</th>
							<td>${row["hospital_name"]}</td>
							<td>${row["phone_number"]}</td>
							<td>${row["address"]}</td>
							<td>${ambulance_service}</td>
						</tr>`
					);	
				}
			}
		}
	});

};

var appendParkingLotDetails = function(){

	$.ajax({
		type: "POST",
		url: serverURL+"parkinglot/details/",
		async: true,
		data: {
			'latitude': latStr,
			'longitude': lngStr
		},
		success: function (data) {
			numberOfAvailableSlots = 0;
			numberOfOccupiedSlots = 10;
			if(data.status_code==200){
				parkingData = data.data;
				$("#nearestParkingLot").html(data.data[0]['place_name']);
				numberOfAvailableSlots = data.data[0]['slots_occupied'].split(',').length;
				numberOfOccupiedSlots = parseInt(data.data[0]['no_of_lots'])-numberOfAvailableSlots;
			}
			if ($('#ampiechart2').length) {
				var chart = AmCharts.makeChart("ampiechart2", {
					"type": "pie",
					"theme": "dark",
					"labelRadius": -65,
					"labelText": "[[title]]%",
					"dataProvider": [{
						"title": "Available ",
						"value": numberOfAvailableSlots
					}, {
						"title": "Occupied ",
						"value": numberOfOccupiedSlots
					}],
					"titleField": "title",
					"valueField": "value",
					"export": {
						"enabled": false
					},
					"color": "#fff"
				});
			}
		}
	});

};

var appendPlaceDetails = function(){

	$.ajax({
		type: "POST",
		url: serverURL+"place/details/",
		async: true,
		data: {
			'latitude': latStr,
			'longitude': lngStr
		},
		success: function (data) {
			if(data.status_code==200){
				locationData = data.data;
				console.log(data);
				var len = data.data.length;
				len = len > 3 ? 3 : len;
				for(var i=0; i<len; i++) {
					var row = data['data'][i];
					var photoLink = row['photo_link']!="" ? row['photo_link'] : "assets/images/blog/post-thumb1.jpg";
					$('#nearbyPlaces').append(
						`<div class="single-post mb-xs-40 mb-sm-40">
							<div class="lts-thumb">
								<img src=${photoLink} alt="post thumb">
							</div>
							<div class="lts-content">
								<span>${row['place_name']}</span>
								<h2>
									<a href="blog.html">${row['place_type']}</a>
								</h2>
								<p>${row['reviews']}</p>
								<br/>
								<p><strong>Services Provided :</strong> ${row['services_provided']}</p>
							</div>
						</div>`
					);
				}
			}
		}
	});

};

var appendPoliceDetails = function(){

	$.ajax({
		type: "POST",
		url: serverURL+"police/details/",
		async: true,
		data: {
			'latitude': latStr,
			'longitude': lngStr
		},
		success: function (data) {
			if(data.status_code==200){
				policeData= data.data;
				var len = data.data.length;
				len = len > 3 ? 3 : len;
				for(var i=0; i<len; i++) {
					var row = data['data'][i];
					$('#policeStationTable').append(
						`<tr>
							<th scope="row">${i+1}</th>
							<td>${row["station_name"]}</td>
							<td>${row["phone_number"]}</td>
							<td>${row["address"]}</td>
							<td>${row["region"]}</td>
						</tr>`
					);
				}
			}
		}
	});

};

var appendGuideDetails = function(){

	$.ajax({
		type: "POST",
		url: serverURL+"guide/details/",
		async: true,
		data: {
			'latitude': latStr,
			'longitude': lngStr
		},
		success: function (data) {
			if(data.status_code==200){
				guideData = data.data;
				var len = data.data.length;
				len = len > 3 ? 3 : len;
				for(var i=0; i<len; i++) {
					var row = data['data'][i];
					$('#guidesTable').append(
						`<tr>
							<th scope="row">${i+1}</th>
							<td>${row["guide_name"]}</td>
							<td>${row["place_name"]}</td>
							<td>${row["phone_number"]}</td>
							<td>${row["languages_known"]}</td>
						</tr>`
					);
				}
			}
		}
	});

};
//Icon Definitions
var hospitalMarker = L.icon({
	iconUrl: "./assets/images/icons-new/hospital-building.png",
	iconSize: [38,38],
	popupAnchor: [-3,-76],
	shadowSize: [68, 95],
    shadowAnchor: [22, 94] 
})

var policeStationMarker = L.icon({
	iconUrl: "./assets/images/icons-new/police.png",
	iconSize: [38,38],
	popupAnchor: [-3,-76],
	shadowSize: [68, 95],
    shadowAnchor: [22, 94] 
})
var guideMarker = L.icon({
	iconUrl: "./assets/images/icons-new/guide.png",
	iconSize: [38,38],
	popupAnchor: [-3,-76],
	shadowSize: [68, 95],
    shadowAnchor: [22, 94] 
})
var locationsMarker = L.icon({
	iconUrl: "./assets/images/icons-new/locations.png",
	iconSize: [38,38],
	popupAnchor: [-3,-76],
	shadowSize: [68, 95],
    shadowAnchor: [22, 94] 
})
var parkingMarker = L.icon({
	iconUrl: "./assets/images/icons-new/parkinggarage.png",
	iconSize: [38,38],
	popupAnchor: [-3,-76],
	shadowSize: [68, 95],
    shadowAnchor: [22, 94] 
})
var myIcon = L.icon({
    iconUrl: "./assets/images/icons-new/current-loc.png",
    iconSize: [33, 33],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});

appendHospitalDetails();
appendParkingLotDetails();
appendPlaceDetails();
appendPoliceDetails();
appendGuideDetails();