from django.contrib import admin  # Import from django.contrib.admin
from django.urls import path, include
from django.views.generic import TemplateView  # Import TemplateView here

urlpatterns = [
    path('admin/', admin.site.urls),  # This is where the admin site is correctly registered
    path('api/', include('tasks.urls')),  # Assuming you're also handling an API here
    path('', TemplateView.as_view(template_name='index.html'), name='home'),  # Serve the home page
]

