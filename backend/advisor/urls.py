from django.urls import path

from .views import (
    HealthView,
    LoginView,
    LogoutView,
    ProfileView,
    RecommendationsView,
    SessionView,
    SignupView,
)

urlpatterns = [
    path('health/', HealthView.as_view(), name='advisor-health'),
    path('auth/signup/', SignupView.as_view(), name='advisor-signup'),
    path('auth/login/', LoginView.as_view(), name='advisor-login'),
    path('auth/logout/', LogoutView.as_view(), name='advisor-logout'),
    path('auth/session/', SessionView.as_view(), name='advisor-session'),
    path('profile/', ProfileView.as_view(), name='advisor-profile'),
    path('recommendations/', RecommendationsView.as_view(), name='advisor-recommendations'),
]

