from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from rest_framework import generics, serializers
from rest_framework import status

from app_natagua.models import Transportistas

class TransportistaSerializer(serializers.Serializer):

    class Meta:
        model = Transportistas
        fields = ('id', 'apellido')

        ('id', models.AutoField(help_text='Id único para transportista ', primary_key=True, serialize=False)),
        ('apellido', models.CharField(max_length=100)),
        ('nombre', models.CharField(max_length=100)),
        ('edad', models.CharField(max_length=10)),
        ('direccion', models.CharField(max_length=200)),
        ('entre_calle', models.CharField(max_length=200)),
        ('mobile', models.CharField(max_length=50)),
        ('sexo', models.CharField(choices=[('M', 'Masculino'), ('F', 'Femenino')], max_length=1)),
        ('cbu', models.CharField(max_length=40)),
        ('mail', models.CharField(max_length=100)),
        ('description', models.TextField(max_length=1000)),


    id = serializers.IntegerField(read_only=True)
    nombre = serializers.CharField(required=True, allow_blank=False, max_length=100)


    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return Transportistas.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Snippet` instance, given the validated data.
        """
        instance.nombre = validated_data.get('nombre', instance.nombre)
        instance.save()
        return instance
