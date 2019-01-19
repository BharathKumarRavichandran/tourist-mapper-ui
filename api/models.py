from django.db import models

class Guide(models.Model):
	guide_id        = models.AutoField(primary_key=True)
	guide_name      = models.CharField(max_length=255)
	place_name	    = models.CharField(max_length=255)
	latitude 	    = models.DecimalField(max_digits=9, decimal_places=6)
	longitude 	    = models.DecimalField(max_digits=9, decimal_places=6)
	phone_number    = models.CharField(max_length=255,unique=True)
	languages_known = models.CharField(max_length=255)
	is_active       = models.BooleanField(choices=((True, 'active'), (False, 'inactive')))

class PoliceStation(models.Model):
	station_id   = models.AutoField(primary_key=True)
	station_name = models.CharField(max_length=255)
	latitude 	 = models.DecimalField(max_digits=9, decimal_places=6)
	longitude 	 = models.DecimalField(max_digits=9, decimal_places=6)
	zone         = models.CharField(max_length=255)
	region       = models.CharField(max_length=255)
	phone_number = models.CharField(max_length=255,unique=True)
	address      = models.CharField(max_length=1255)

class Hospital(models.Model):
	hospital_id       = models.AutoField(primary_key=True)
	hospital_name     = models.CharField(max_length=255)
	latitude 	      = models.DecimalField(max_digits=9, decimal_places=6)
	longitude 	      = models.DecimalField(max_digits=9, decimal_places=6)
	zone              = models.CharField(max_length=255)
	address           = models.CharField(max_length=1255)
	phone_number      = models.CharField(max_length=255,unique=True)
	ambulance_service = models.BooleanField(choices=((True, 'available'), (False, 'unavailable')))

class Place(models.Model):
	place_id   		   = models.AutoField(primary_key=True)
	place_name 		   = models.CharField(max_length=255)
	place_type		   = models.CharField(max_length=255)
	latitude 	   	   = models.DecimalField(max_digits=9, decimal_places=6)
	longitude 	   	   = models.DecimalField(max_digits=9, decimal_places=6)
	reviews    		   = models.TextField()
	services_provided  = models.TextField()
	crowd_density	   = models.FloatField()
	website_url        = models.TextField()
	additional_info    = models.TextField()
	photo_link		   = models.URLField()
	is_available       = models.BooleanField(choices=((True, 'available'), (False, 'unavailable')))

class ParkingLot(models.Model):
	lot_id         = models.AutoField(primary_key=True)
	place_name     = models.CharField(max_length=255)
	latitude 	   = models.DecimalField(max_digits=9, decimal_places=6)
	longitude 	   = models.DecimalField(max_digits=9, decimal_places=6)
	no_of_lots     = models.IntegerField()
	slots_occupied = models.TextField()

class Volunteer(models.Model):
	volunteer_id   = models.AutoField(primary_key=True)
	road_name      = models.CharField(max_length=999)
	volunteer_name = models.CharField(max_length=255)
	latitude 	   = models.DecimalField(max_digits=9, decimal_places=6)
	longitude 	   = models.DecimalField(max_digits=9, decimal_places=6)
	phone_number   = models.CharField(max_length=255,unique=True)
	is_present     = models.BooleanField(choices=((True, 'available'), (False, 'unavailable')))

class Road(models.Model):
	road_id   = models.AutoField(primary_key=True)
	road_name = models.CharField(max_length=255)
	condition = models.CharField(max_length=255)
