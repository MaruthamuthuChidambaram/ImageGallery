from rest_framework import serializers
from .models import *
from django.core.exceptions import ValidationError
from django.db.models import Q

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageManagement
        fields = '__all__'    
    





