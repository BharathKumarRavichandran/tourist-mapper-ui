var serverURL = 'http:localhost:8000/api/';

var lat = 12.9904;
var lng = 80.2171;

var latStr = lat.toString();
var lngStr = lng.toString();

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
							<td><button data-toggle='modal' data-target='#exampleModalLong' class="material-raised-button">Avail</button></td>
						</tr>`
					);
				}
			}
		}
	});

};

appendPoliceDetails();
