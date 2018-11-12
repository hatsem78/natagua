from unittest import TestCase

from rest_framework.test import RequestsClient

class AuthorTest(TestCase):
    def setUp(self):
        super(AuthorTest, self).setUp()

    def test_list(self):
        client = RequestsClient()
        response = client.get('http://localhost:8000/book/api/author/list/')
        assert response.status_code == 200