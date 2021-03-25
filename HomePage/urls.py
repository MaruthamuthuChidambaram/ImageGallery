from django.urls import path
from .views import *

urlpatterns = [
    # Image Gallery API
    path('', ImageListView.as_view(), name='image_list_view'),
    path('image-add-view/', ImageAddView.as_view(), name='image_add_view'),
    path('image-add-view/<int:pk>/', ImageAddView.as_view(), name='image_edit_view'),
    path('image/', ImageList.as_view(), name='image_list'),
    path('image/<int:pk>/', ImageDetails.as_view(), name='image_detail'),
   
]
