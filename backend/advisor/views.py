from __future__ import annotations

from typing import Dict

from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.models import update_last_login
from django.db import transaction
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import UserProfile
from .services import generate_recommendations

User = get_user_model()


def serialize_user(user: User) -> Dict[str, str]:
    name = user.get_full_name() or user.first_name or user.email.split('@')[0]
    return {
        'id': str(user.id),
        'email': user.email,
        'name': name,
    }


def serialize_profile(profile: UserProfile) -> Dict[str, object]:
    return {
        'skills': profile.skills,
        'interests': profile.interests,
        'educationLevel': profile.education_level,
        'yearsExperience': profile.years_experience,
        'currentRole': profile.current_role,
        'updatedAt': profile.updated_at.isoformat(),
    }


class HealthView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({'status': 'ok'}, status=status.HTTP_200_OK)


class SignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        name = (request.data.get('name') or '').strip()
        email = (request.data.get('email') or '').strip().lower()
        password = (request.data.get('password') or '').strip()

        errors = {}
        if not name:
            errors['name'] = 'Name is required.'
        if not email:
            errors['email'] = 'Email is required.'
        if not password or len(password) < 6:
            errors['password'] = 'Password must be at least 6 characters.'
        if errors:
            return Response({'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({'error': 'An account with this email already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        first_name, last_name = (name.split(' ', 1) + [''])[:2]

        with transaction.atomic():
            user = User.objects.create_user(
                username=email,
                email=email,
                password=password,
                first_name=first_name,
                last_name=last_name,
            )
            profile, _ = UserProfile.objects.get_or_create(user=user)
            token, _ = Token.objects.get_or_create(user=user)

        return Response(
            {
                'token': token.key,
                'user': serialize_user(user),
                'profile': serialize_profile(profile),
            },
            status=status.HTTP_201_CREATED,
        )


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = (request.data.get('email') or '').strip().lower()
        password = request.data.get('password') or ''

        user = authenticate(request, username=email, password=password)
        if not user:
            return Response({'error': 'Invalid email or password.'}, status=status.HTTP_400_BAD_REQUEST)

        token, _ = Token.objects.get_or_create(user=user)
        update_last_login(None, user)

        return Response(
            {
                'token': token.key,
                'user': serialize_user(user),
            },
            status=status.HTTP_200_OK,
        )


class LogoutView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        Token.objects.filter(user=request.user).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class SessionView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile, _ = UserProfile.objects.get_or_create(user=request.user)
        return Response({'user': serialize_user(request.user), 'profile': serialize_profile(profile)})


class ProfileView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile, _ = UserProfile.objects.get_or_create(user=request.user)
        return Response({'profile': serialize_profile(profile)})

    def post(self, request):
        profile, _ = UserProfile.objects.get_or_create(user=request.user)

        data = request.data or {}
        profile.skills = data.get('skills', profile.skills)
        profile.interests = data.get('interests', profile.interests)
        profile.education_level = data.get('educationLevel', profile.education_level)
        profile.years_experience = data.get('yearsExperience', profile.years_experience)
        profile.current_role = data.get('currentRole', profile.current_role)
        profile.save()

        return Response({'profile': serialize_profile(profile)})


class RecommendationsView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile, _ = UserProfile.objects.get_or_create(user=request.user)
        recommendations = generate_recommendations(profile)
        return Response({'recommendations': recommendations})
