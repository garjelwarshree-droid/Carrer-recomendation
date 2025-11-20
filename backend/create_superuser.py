# create_superuser.py
from django.contrib.auth import get_user_model

User = get_user_model()

username = "mandar"
email = "mandar1@gmail.com"
password = "mandar@123"   # choose a strong password

if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username=username, email=email, password=password)
    print("Superuser created.")
else:
    print("Superuser already exists.")
