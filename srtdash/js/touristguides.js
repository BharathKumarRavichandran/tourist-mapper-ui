var serverURL = 'http:localhost:8000/api/';

var lat = 12.9904;
var lng = 80.2171;

var latStr = lat.toString();
var lngStr = lng.toString();

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
							<td><button data-toggle='modal' data-target='#exampleModalLong' class="material-raised-button">Avail</button></td>
						</tr>`
					);
				}
			}
		}
	});
};

appendGuideDetails();
