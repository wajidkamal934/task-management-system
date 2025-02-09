from django.contrib import admin
from .models import Task, Project, Comment  # Make sure your models are imported

# Register your models so they are accessible from the Django admin interface
admin.site.register(Task)
admin.site.register(Project)
admin.site.register(Comment)
