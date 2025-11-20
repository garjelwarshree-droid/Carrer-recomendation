from django.conf import settings
from django.db import models


class UserProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    skills = models.JSONField(default=list, blank=True)
    interests = models.JSONField(default=list, blank=True)
    education_level = models.CharField(max_length=64, blank=True)
    years_experience = models.CharField(max_length=32, blank=True)
    current_role = models.CharField(max_length=128, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Profile for {self.user.email}'
