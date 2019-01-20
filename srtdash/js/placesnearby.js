var serverURL = 'http:localhost:8000/api/';

var lat = 12.9904;
var lng = 80.2171;

var latStr = lat.toString();
var lngStr = lng.toString();

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
					console.log(photoLink);
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

appendPlaceDetails();