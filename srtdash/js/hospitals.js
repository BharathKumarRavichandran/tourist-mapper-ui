var serverURL = 'http:localhost:8000/api/';

var lat = 12.9904;
var lng = 80.2171;

var latStr = lat.toString();
var lngStr = lng.toString();

var appendParkingLotDetailsNearest = function(){

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
							<td><button data-toggle='modal' data-target='#exampleModalLong' class="material-raised-button">Avail</button></td>
						</tr>`
					);
				}
			}
		}
	});

};

appendParkingLotDetailsNearest();