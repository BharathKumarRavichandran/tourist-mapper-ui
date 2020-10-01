from django.views import generic
from django.views.generic import View
from django.utils.decorators import method_decorator
from django.forms.models import model_to_dict
from math import floor

from api.models import *
from api.helpers.response_helpers import error_response, invalid_params_response
from api.decorators.response import JsonResponseDecorator

from math import radians, cos, sin, asin, sqrt

def haversine(lon1, lat1, lon2, lat2):
    """
    Calculate the great circle distance between two points 
    on the earth (specified in decimal degrees)
    """
    # convert decimal degrees to radians 
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])

    # haversine formula 
    dlon = lon2 - lon1 
    dlat = lat2 - lat1 
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * asin(sqrt(a)) 
    r = 6371 # Radius of earth in kilometers. Use 3956 for miles
    return c * r

@method_decorator(JsonResponseDecorator, name='dispatch')
class GuideInfoView(View):

	def post(self, request):

		lat = float(request.POST.get('latitude'))
		lng = float(request.POST.get('longitude'))

		guides_short = []

		guides = Guide.objects.all()

		for index, guide in enumerate(guides):
			distance = haversine(guide.longitude,guide.latitude,lng,lat)
			if(distance<20):
				guides_short.append(model_to_dict(guide))

		return guides_short


@method_decorator(JsonResponseDecorator, name='dispatch')
class PlaceAdditionalView(View):

	def post(self, request):
		
		lat = float(request.POST.get('latitude'))
		lng = float(request.POST.get('longitude'))

		places_short = []

		places = Place.objects.all()

		for index, place in enumerate(places):
			distance = haversine(place.longitude,place.latitude,lng,lat)
			if(floor(distance)<20):
				places_short.append(model_to_dict(place))

		return places_short

@method_decorator(JsonResponseDecorator, name='dispatch')
class BookingServicesView(View):

	def post(self, request):
			
		lat = float(request.POST.get('latitude'))
		lng = float(request.POST.get('longitude'))

		places_short = []

		places = Place.objects.all()

		for index, place in enumerate(places):
			distance = haversine(place.longitude,place.latitude,lng,lat)
			if(floor(distance)<20):
				places_short.append(model_to_dict(place))

		return places_short

@method_decorator(JsonResponseDecorator, name='dispatch')
class ParkingInfoView(View):

	def post(self, request):
			
		lat = float(request.POST.get('latitude'))
		lng = float(request.POST.get('longitude'))

		places_short = []

		places = ParkingLot.objects.all()

		for index, place in enumerate(places):
			distance = haversine(place.longitude,place.latitude,lng,lat)
			if(floor(distance)<20):
				places_short.append(model_to_dict(place))

		return places_short

@method_decorator(JsonResponseDecorator, name='dispatch')
class PoliceDetailsView(View):

	def post(self, request):
			
		lat = float(request.POST.get('latitude'))
		lng = float(request.POST.get('longitude'))

		places_short = []

		places = PoliceStation.objects.all()

		for index, place in enumerate(places):
			distance = haversine(place.longitude,place.latitude,lng,lat)
			print(distance)
			if(floor(distance)<20):
				places_short.append(model_to_dict(place))

		return places_short

@method_decorator(JsonResponseDecorator, name='dispatch')
class HospitalDetailsView(View):

	def post(self, request):
		print(request)
		lat = float(request.POST.get('latitude'))
		lng = float(request.POST.get('longitude'))

		places_short = []

		places = Hospital.objects.all()

		for index, place in enumerate(places):
			distance = haversine(place.longitude,place.latitude,lng,lat)
			if(floor(distance)<20):
				places_short.append(model_to_dict(place))

		return places_short
