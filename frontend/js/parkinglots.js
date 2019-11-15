var serverURL = 'http:localhost:8000/api/';

var lat = 12.9904;
var lng = 80.2171;

var latStr = lat.toString();
var lngStr = lng.toString();

var appendParkingLotDetailsNearest = function(){

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
			numberOfAvailableSlots_2 = 0;
			numberOfOccupiedSlots_2 = 10;

			if(data.status_code==200){
				if(data.data.length>0){
					$("#nearestParkingLot").html(data.data[0]['place_name']);
					numberOfOccupiedSlots = data.data[0]['slots_occupied'].split(',').length;
					numberOfAvailableSlots = parseInt(data.data[0]['no_of_lots'])-numberOfOccupiedSlots;
				}
				if(data.data.length>1){
					$("#nearestParkingLot2").html(data.data[1]['place_name']);
					numberOfOccupiedSlots_2 = data.data[1]['slots_occupied'].split(',').length;
					numberOfAvailableSlots_2 = parseInt(data.data[1]['no_of_lots'])-numberOfOccupiedSlots_2;
				}
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
			if ($('#ampiechart2_2').length) {
				console.log(numberOfAvailableSlots_2);
				console.log(numberOfOccupiedSlots_2);
				var chart = AmCharts.makeChart("ampiechart2_2", {
					"type": "pie",
					"theme": "dark",
					"labelRadius": -65,
					"labelText": "[[title]]%",
					"dataProvider": [{
						"title": "Available ",
						"value": numberOfAvailableSlots_2
					}, {
						"title": "Occupied ",
						"value": numberOfOccupiedSlots_2
					}],
					"titleField": "title",
					"valueField": "value",
					"export": {
						"enabled": false
					},
					"color": "#fff"
				});
			}
			var len = data.data.length;
			for(var i=0; i<len; i++) {
				var row = data['data'][i];
				$('#parkingLotTable').append(
					`<tr>
						<th scope="row">${i+1}</th>
						<td>${row["place_name"]}</td>
						<td>${row["no_of_lots"]}</td>
						<td>${row["slots_occupied"]}</td>
						<td><button data-toggle='modal' data-target='#exampleModalLong' class="material-raised-button">Avail</button></td>
					</tr>`
				);
			}
		}
	});

};

appendParkingLotDetailsNearest();