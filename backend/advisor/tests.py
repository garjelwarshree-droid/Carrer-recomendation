from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase


class HealthEndpointTests(APITestCase):
    def test_health_endpoint_returns_ok(self):
        response = self.client.get(reverse('advisor-health'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), {'status': 'ok'})


class AuthFlowTests(APITestCase):
    def test_signup_and_login(self):
        signup_payload = {
            'name': 'Jane Doe',
            'email': 'jane@example.com',
            'password': 'securepass',
        }
        signup_response = self.client.post(
            reverse('advisor-signup'),
            signup_payload,
            format='json',
        )
        self.assertEqual(signup_response.status_code, status.HTTP_201_CREATED)
        self.assertIn('token', signup_response.data)
        self.assertIn('user', signup_response.data)

        login_response = self.client.post(
            reverse('advisor-login'),
            {'email': 'jane@example.com', 'password': 'securepass'},
            format='json',
        )
        self.assertEqual(login_response.status_code, status.HTTP_200_OK)
        self.assertIn('token', login_response.data)
        self.assertEqual(login_response.data['user']['email'], 'jane@example.com')

    def test_login_rejects_invalid_credentials(self):
        response = self.client.post(
            reverse('advisor-login'),
            {'email': 'ghost@example.com', 'password': 'nope'},
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)


class ProfileAndRecommendationsTests(APITestCase):
    def setUp(self):
        user_model = get_user_model()
        self.user = user_model.objects.create_user(
            username='user@example.com',
            email='user@example.com',
            password='testpass123',
            first_name='Test',
        )
        self.token = Token.objects.create(user=self.user)

    def auth_headers(self):
        return {'HTTP_AUTHORIZATION': f'Token {self.token.key}'}

    def test_profile_round_trip(self):
        payload = {
            'skills': ['python', 'analytics'],
            'interests': ['data', 'business'],
            'educationLevel': 'bachelors',
            'yearsExperience': '3',
            'currentRole': 'Business Analyst',
        }
        update_response = self.client.post(
            reverse('advisor-profile'),
            payload,
            format='json',
            **self.auth_headers(),
        )
        self.assertEqual(update_response.status_code, status.HTTP_200_OK)
        self.assertEqual(update_response.data['profile']['skills'], payload['skills'])

        get_response = self.client.get(
            reverse('advisor-profile'),
            **self.auth_headers(),
        )
        self.assertEqual(get_response.status_code, status.HTTP_200_OK)
        self.assertEqual(get_response.data['profile']['currentRole'], 'Business Analyst')

    def test_recommendations_require_auth(self):
        response = self.client.get(reverse('advisor-recommendations'))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_recommendations_return_data(self):
        self.client.post(
            reverse('advisor-profile'),
            {
                'skills': ['python', 'analytics', 'sql'],
                'interests': ['data', 'technology'],
                'educationLevel': 'bachelors',
                'yearsExperience': '3',
            },
            format='json',
            **self.auth_headers(),
        )

        response = self.client.get(
            reverse('advisor-recommendations'),
            **self.auth_headers(),
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('recommendations', response.data)
        self.assertGreater(len(response.data['recommendations']), 0)
