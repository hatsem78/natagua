from rest_framework import generics, serializers
from app_natagua.models import Provincia, Localidad


class ProvinciaSerializer(serializers.Serializer):

    class Meta:
        model = Provincia
        fields = ('id', 'nombre')

    id = serializers.IntegerField(read_only=False)
    nombre = serializers.CharField(required=True, allow_blank=False, max_length=100)



class ProvinciaLocalidadSerializer(serializers.ModelSerializer):
    provincia_localidad = serializers.StringRelatedField(many=True)
    class Meta:
        model = Provincia
        fields = ('id', 'nombre', 'provincia_localidad')

    id = serializers.IntegerField(read_only=False)
    nombre = serializers.CharField(required=True, allow_blank=False, max_length=100)



class LocalidadSerializer(serializers.Serializer):


    class Meta:
        model = Localidad
        fields = ('id', 'id_provincia', 'nombre', 'codigopostal')

    id = serializers.IntegerField(read_only=True)
    id_provincia = serializers.IntegerField(read_only=True)
    nombre = serializers.CharField(required=False, allow_blank=False, max_length=100)
    codigopostal = serializers.CharField(required=False, allow_blank=False, max_length=100)


    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return Localidad.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Snippet` instance, given the validated data.
        """
        instance.nombre = validated_data.get('nombre', instance.nombre)
        instance.id_provincia = validated_data.get('id_provincia', instance.id_provincia)
        instance.codigopostal = validated_data.get('codigopostal', instance.codigopostal)
        instance.save()
        return instance
