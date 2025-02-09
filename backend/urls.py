from django.urls import path, include
from django.views.generic import TemplateView

from tasks import admin  # For serving static pages (like home page)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('tasks.urls')),  # Your API URLs
    path('', TemplateView.as_view(template_name='index.html'), name='home'),  # Serve the home page
]
