
  # Personalized Career Advisor App

  This is a code bundle for Personalized Career Advisor App. The original project is available at https://www.figma.com/design/IsAqU6CdtIlu1MdsiAUiZU/Personalized-Career-Advisor-App.

## Running the code

### Frontend (Vite + React)

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server (defaults to http://localhost:3001 with an `/api` proxy pointing to the Django server on port 8000).

### Backend (Django + Django REST Framework)

1. Create and activate a virtual environment (once):
   - `python -m venv .venv`
   - PowerShell: `.\.venv\Scripts\Activate.ps1`
2. Install backend dependencies: `pip install -r backend/requirements.txt`
3. Apply database migrations: `python backend/manage.py migrate`
4. Start the API server: `python backend/manage.py runserver`

Key API routes (prefixed with `/api`):
- `POST /auth/signup/` – create an account (`name`, `email`, `password`)
- `POST /auth/login/` – obtain an auth token (email/password)
- `POST /auth/logout/` – revoke the token
- `GET /auth/session/` – validate the saved token + fetch user info
- `GET/POST /profile/` – retrieve or update the user’s skills/interests/education
- `GET /recommendations/` – token-protected personalized career matches computed locally using a rules-based scoring engine (skills, interests, education, experience, and market demand). Returns the top 3 roles for the user.
- `GET /health/` – simple health probe

The React app talks to the API via `fetch` using the token returned from signup/login. In development, the default API base URL is `http://localhost:8000/api`. You can override it by setting `VITE_API_BASE_URL` before running `npm run dev`.
  