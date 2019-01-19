from django.urls import path, include
from django.conf.urls import url
from django.views.generic import RedirectView
from django.shortcuts import redirect
from . import views

app_name = 'api'

urlpatterns = [
        path('guide/details/', views.GuideInfoView.as_view() , name='guide-details'),

        path('place/details/', views.PlaceAdditionalView.as_view(), name='place-details'),
        
        path('bookingservices/details', views.BookingServicesView.as_view(), name='booking-services-details'),
        
        path('parkinglot/details/', views.ParkingInfoView.as_view(), name='parking-details'),
        
        path('police/details/', views.PoliceDetailsView.as_view(), name='police-details'),

        path('hospital/details/', views.HospitalDetailsView.as_view(), name='hospital-details'),

]