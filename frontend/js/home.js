/*var serverURL = 'http:localhost:8000/api/';

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
					console.log(mymap);
					var latlng = new L.LatLng(parseFloat(row.latitude), parseFloat(row.longitude));
					L.marker(latlng,{icon: hospitalMarker}).addTo(mymap);
						
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
			var latlng = new L.LatLng(parseFloat(data.latitude), parseFloat(data.longitude));
			L.marker(latlng,{icon: parkingMarker}).addTo(mymap);
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
					var latlng = new L.LatLng(parseFloat(row.latitude), parseFloat(row.longitude));
					L.marker(latlng,{icon: guideMarker}).addTo(mymap);		
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
					var latlng = new L.LatLng(parseFloat(row.latitude), parseFloat(row.longitude));
					L.marker(latlng,{icon: policeStationMarker}).addTo(mymap);
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
					var latlng = new L.LatLng(parseFloat(row.latitude), parseFloat(row.longitude));
					L.marker(latlng,{icon: guideMarker}).addTo(mymap);
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


appendHospitalDetails();
appendParkingLotDetails();
appendPlaceDetails();
appendPoliceDetails();
appendGuideDetails();*/