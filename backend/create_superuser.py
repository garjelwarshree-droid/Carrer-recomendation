"""
Full-proof superuser creation script for Django (works on Render too)
Place this file in the same directory as manage.py
"""

import os
import sys
import django

# ------------------------------------------------------------------------------
# 1. Detect Django project settings automatically
# ------------------------------------------------------------------------------

# Find settings module automatically
def auto_detect_settings():
    """
    Automatically detect the Django settings module by searching directories.
    """
    for root, dirs, files in os.walk("."):
        if "settings.py" in files:
            project_name = os.path.basename(root)
            return f"{project_name}.settings"
    return None


# Try ENV variable first
settings_module = os.environ.get("DJANGO_SETTINGS_MODULE")

# If not found, auto-detect it
if not settings_module:
    settings_module = auto_detect_settings()
    if not settings_module:
        print("❌ ERROR: Could not auto-detect settings.py. Set DJANGO_SETTINGS_MODULE manually.")
        sys.exit(1)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", settings_module)


# ------------------------------------------------------------------------------
# 2. Setup Django
# ------------------------------------------------------------------------------
try:
    django.setup()
except Exception as e:
    print(f"❌ Failed to setup Django: {e}")
    sys.exit(1)


# ------------------------------------------------------------------------------
# 3. Create Superuser
# ------------------------------------------------------------------------------

from django.contrib.auth import get_user_model

User = get_user_model()

USERNAME = "mandar"
EMAIL = "mandar1@gmail.com"
PASSWORD = "mandar@123"  # CHANGE THIS BEFORE DEPLOY

try:
    if not User.objects.filter(username=USERNAME).exists():
        User.objects.create_superuser(
            username=USERNAME,
            email=EMAIL,
            password=PASSWORD
        )
        print("✅ Superuser created successfully!")
    else:
        print("ℹ️ Superuser already exists. No action taken.")
except Exception as e:
    print(f"❌ Error creating superuser: {e}")
    sys.exit(1)
