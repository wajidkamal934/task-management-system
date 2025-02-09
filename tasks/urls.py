# tasks/urls.py

# tasks/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),  # Map root URL to index view
]

