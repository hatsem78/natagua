from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from rest_framework import generics, serializers
from rest_framework import status

from app_natagua.models import Turnos


class TurnoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Turnos
        fields = ('id', 'nombre')
