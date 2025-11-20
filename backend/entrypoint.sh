#!/usr/bin/env bash
set -e

# Run database migrations and collect static files, then start Gunicorn.
# Railway provides $PORT automatically.

python manage.py migrate --no-input
python manage.py collectstatic --no-input --clear

exec gunicorn core.wsgi:application --bind 0.0.0.0:${PORT:-8000}
