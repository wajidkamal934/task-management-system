from django.db import models
from django.contrib.auth.models import User  # This imports the default Django User model


# Project Model
class Project(models.Model):
    project_name = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.project_name


# Task Model
class Task(models.Model):
    task_title = models.CharField(max_length=255)
    description = models.TextField()
    status_choices = (
        ('To Do', 'To Do'),
        ('In Progress', 'In Progress'),
        ('Completed', 'Completed'),
    )
    status = models.CharField(max_length=20, choices=status_choices, default='To Do')
    priority_choices = (
        ('Low', 'Low'),
        ('Medium', 'Medium'),
        ('High', 'High'),
    )
    priority = models.CharField(max_length=20, choices=priority_choices, default='Medium')
    deadline = models.DateTimeField(null=True, blank=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='tasks')
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.task_title


# Comment Model
class Comment(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.user.username} on {self.task.task_title}"


# Report Model
class Report(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='reports')
    report_text = models.TextField()
    generated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Report for {self.task.task_title}"
