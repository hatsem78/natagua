from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from rest_framework import generics, serializers


from app_natagua.models import Promocion


class PromocionPagSerializer(serializers.Serializer):
    class Meta:
        model = Promocion
        fields = fields = (
            'id',
            'nombre',
            'porcentaje',
            'fecha_expiracion',
            'expiracion', 'activo', 'description'
        )

    id = serializers.IntegerField(read_only=True)
    nombre = serializers.CharField(required=True, allow_blank=False, max_length=100)
    fecha_expiracion= serializers.DateTimeField()
    porcentaje = serializers.CharField(required=True, allow_blank=False, max_length=3)
    expiracion = serializers.BooleanField(False)
    activo = serializers.BooleanField(True)
    description = serializers.CharField(max_length=500, allow_blank=True)



class PromocionSerializer(serializers.Serializer):
    class Meta:
        model = Promocion
        fields = fields = (
            'nombre',
            'porcentaje',
            'fecha_expiracion',
            'expiracion',
            'activo',
            'description'
        )


    nombre = serializers.CharField(required=True, allow_blank=False, max_length=100)
    fecha_expiracion = serializers.DateTimeField()
    porcentaje = serializers.CharField(required=True, allow_blank=False, max_length=3)
    expiracion = serializers.BooleanField(False)
    activo = serializers.BooleanField(True)
    description = serializers.CharField(max_length=500, allow_blank=True)


    def create(self, validated_data):
        """
        Create and return a new `Complejo` instance, given the validated data.
        """
        return Promocion.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Complejo` instance, given the validated data.
        """
        instance.nombre = validated_data.get('nombre', instance.nombre)
        instance.fecha_expiracion = validated_data.get('fecha_expiracion', instance.fecha_expiracion)
        instance.porcentaje = validated_data.get('porcentaje', instance.porcentaje)
        instance.expiracion = validated_data.get('expiracion', instance.expiracion)
        instance.activo = validated_data.get('activo', instance.activo)
        instance.description = validated_data.get('description', instance.description)

        instance.save()
        return instance
