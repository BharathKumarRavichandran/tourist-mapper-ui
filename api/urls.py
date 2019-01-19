from django.urls import path, include
from django.conf.urls import url
from django.views.generic import RedirectView
from django.shortcuts import redirect

app_name = 'api'

urlpatterns = [
        path('guide/info/<decimal:lat>/<decimal:long>/', views.guideinfo, name='guide-info'),
        path('place/additionalinfo/<decimal:lat>/<decimal:long>/',views.additionalinfo, name='place-info'),
        path('bookingservices/<decimal:lat>/<decimal:long>/',view.bookservices, name='booking-services'),
        path('parkinglot/details/<decimal:lat>/<decimal:long>/',views.parkinginfo, name='parking-info'),
        path('place/police-details/<decimal:lat>/<decimal:long>/',views.policedetails, name='police-details'),
        path('place/guide-details/<decimal:lat>/<decimal:long>/',views.guidedetails, name='police-details')

]