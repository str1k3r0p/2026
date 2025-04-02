from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.user_register, name='register'),  # User registration URL
    path('login/', views.user_login, name='login'),
    path('logout/', views.user_logout, name='logout'),
    path('profile/update/', views.update_profile, name='update_profile'),
    path('profile/delete/', views.delete_profile, name='delete_profile'),
]