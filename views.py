import json
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from rest_framework.authtoken.models import Token
from .models import Profile
from django.shortcuts import render


# User Login View with Token Generation
def user_login(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
        except json.JSONDecodeError:
            return JsonResponse({"message": "Invalid JSON", "status": "error"})

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            # Generate token for the user
            token, created = Token.objects.get_or_create(user=user)
            return JsonResponse({"message": "Login successful", "token": token.key, "status": "success"})
        else:
            return JsonResponse({"message": "Invalid credentials", "status": "error"})
    
    return render(request, 'login.html')


# User Registration View with Token Generation
def user_register(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
            password_confirm = data.get('password_confirm')
        except json.JSONDecodeError:
            return JsonResponse({"message": "Invalid JSON", "status": "error"})

        # Check if passwords match
        if password != password_confirm:
            return JsonResponse({"message": "Passwords do not match", "status": "error"})

        # Check if the user already exists
        if User.objects.filter(username=username).exists():
            return JsonResponse({"message": "Username already exists", "status": "error"})

        # Create new user and generate token
        user = User.objects.create_user(username=username, password=password)
        token, created = Token.objects.get_or_create(user=user)

        return JsonResponse({"message": "User registered successfully", "token": token.key, "status": "success"})
    
    return JsonResponse({"message": "Invalid request", "status": "error"})


# Profile Update View
@login_required
def update_profile(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            job_info = data.get('job_info', '')
            school_info = data.get('school_info', '')
        except json.JSONDecodeError:
            return JsonResponse({"message": "Invalid JSON", "status": "error"})

        # Ensure profile exists for the current user
        profile, created = Profile.objects.get_or_create(user=request.user)
        profile.job_info = job_info
        profile.school_info = school_info
        profile.save()
        
        return JsonResponse({"message": "Profile updated successfully", "status": "success"})
    
    return JsonResponse({"message": "Invalid request", "status": "error"})


# Profile Delete View
@login_required
def delete_profile(request):
    if request.method == 'POST':
        profile = Profile.objects.get(user=request.user)
        profile.delete()
        return JsonResponse({"message": "Profile deleted successfully", "status": "success"})
    
    return JsonResponse({"message": "Invalid request", "status": "error"})


# User Logout View
@login_required
def user_logout(request):
    logout(request)
    return JsonResponse({"message": "Logged out successfully", "status": "success"})
