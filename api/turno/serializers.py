from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from rest_framework import generics, serializers
from rest_framework import status

from app_natagua.models import Turnos


class TurnoSerializers(serializers.ModelSerializer):
    class Meta:
        model = Turnos
        fields = ('id', 'nombre')



class TurnoSerializer(serializers.Serializer):

    class Meta:
        model = Turnos
        fields = ('id', 'nombre')

    id = serializers.IntegerField(read_only=True)
    nombre = serializers.CharField(required=True, allow_blank=False, max_length=100)


    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return Turnos.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Snippet` instance, given the validated data.
        """
        instance.nombre = validated_data.get('nombre', instance.nombre)
        instance.save()
        return instance
