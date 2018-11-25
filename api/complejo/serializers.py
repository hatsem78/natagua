from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from rest_framework import generics, serializers


from app_natagua.models import Complejo

class ComplejoPagSerializer(serializers.Serializer):
    class Meta:
        model = Complejo
        fields = fields = ('id', 'nombre', 'direccion', 'telefono', 'descripcion')

    id = serializers.IntegerField(read_only=True)
    dni = serializers.IntegerField()
    nombre = serializers.CharField(required=True, allow_blank=False, max_length=100)
    direccion = serializers.CharField(max_length=200)
    telefono = serializers.CharField(max_length=50, allow_blank=True)
    description = serializers.CharField(max_length=500, allow_blank=True)



class ComplejoSerializer(serializers.Serializer):

    class Meta:
        model = Complejo
        fields = fields = ('id', 'nombre', 'direccion', 'telefono', 'descripcion')

    id = serializers.IntegerField(read_only=True)
    nombre = serializers.CharField(required=True, allow_blank=False, max_length=100)
    direccion = serializers.CharField(max_length=200, allow_blank=True, required=False)
    telefono = serializers.CharField(max_length=50, allow_blank=True)
    description = serializers.CharField(max_length=500, allow_blank=True, required=False)


    def create(self, validated_data):
        """
        Create and return a new `Complejo` instance, given the validated data.
        """
        return Complejo.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Complejo` instance, given the validated data.
        """
        instance.nombre = validated_data.get('nombre', instance.nombre)
        instance.direccion = validated_data.get('direccion', instance.direccion)
        instance.telefono = validated_data.get('telefono', instance.telefono)
        instance.descripcion = validated_data.get('descripcion', instance.descripcion)

        instance.save()
        return instance
