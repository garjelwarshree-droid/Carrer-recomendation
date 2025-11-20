from django.contrib import admin

from .models import UserProfile


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'education_level', 'years_experience', 'updated_at')
    search_fields = ('user__email', 'education_level', 'current_role')
    readonly_fields = ('updated_at',)
