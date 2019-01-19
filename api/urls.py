from django.urls import path, include
from django.conf.urls import url
from django.views.generic import RedirectView
from django.shortcuts import redirect
from . import views

app_name = 'api'

urlpatterns = [
        path('guide/info/', views.GuideInfoView.as_view() , name='guide-info'),

        path('place/additionalinfo/', views.PlaceAdditionalView.as_view(), name='place-info'),
        
        path('bookingservices/', views.BookingServicesView.as_view(), name='booking-services'),
        
        path('parkinglot/details/', views.ParkingInfoView.as_view(), name='parking-info'),
        
        path('place/police-details/', views.PoliceDetailsView.as_view(), name='police-details'),

]