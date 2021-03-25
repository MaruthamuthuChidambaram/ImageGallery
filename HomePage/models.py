# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.db import models
from django.conf import settings

# Base Model Initialization
class BaseModel(models.Model):
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='%(class)s_createdby',
                    on_delete=models.CASCADE, default=1)
    modified_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='%(class)s_modifiedby', 
                    null=True, blank=True, on_delete=models.CASCADE, default=1)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)
    is_delete = models.BooleanField(default=False)

    class Meta:
        abstract = True


class CategoryManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_delete=False)

class Category(BaseModel):
    name = models.CharField(max_length=75)
    description = models.TextField(null=True, blank=True)

    objects = CategoryManager() # The default manager.
    
    class Meta:
        db_table = 'category'


class ImageManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_delete=False)

class ImageManagement(BaseModel):
    image = models.ImageField(default='no_img_available.png', upload_to='images/', null=True, blank=True)
    category = models.ForeignKey(Category, related_name='image_category_id', on_delete=models.CASCADE)

    objects = ImageManager() # The default manager.
    
    class Meta:
        db_table = 'image_details'