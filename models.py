from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    job_info = models.TextField(blank=True)
    school_info = models.TextField(blank=True)

    def __str__(self):
        return self.user.username
