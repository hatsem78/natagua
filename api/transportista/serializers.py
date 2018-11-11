from rest_framework import generics, serializers

id = serializers.IntegerField(read_only=True)
from django.core.exceptions import ValidationError
from app_natagua.models import Transportista, Provincia, Localidad


class TransportistaPagZerializer(serializers.Serializer):
    class Meta:
        model = Transportista
        fields = fields = ('id', 'apellido', 'nombre', 'dni', 'edad', 'direccion', 'entre_calle',
                           'celular', 'telefono', 'sexo', 'mail', 'description', 'get_id_provincia', 'localidad')

    id = serializers.IntegerField()
    dni = serializers.IntegerField()
    apellido = serializers.CharField(required=True, allow_blank=False, max_length=100)
    nombre = serializers.CharField(required=True, allow_blank=False, max_length=100)
    edad = serializers.CharField(required=True, allow_blank=False, max_length=10)
    direccion = serializers.CharField(max_length=200)
    celular = serializers.CharField(max_length=50, allow_blank=True)
    telefono = serializers.CharField(max_length=50, allow_blank=True)
    entre_calle = serializers.CharField(max_length=200)
    mail = serializers.EmailField(max_length=100)
    description = serializers.CharField(max_length=500, allow_blank=True)
    sexo = serializers.CharField(max_length=5)

    def create(self, validated_data):
        """
        Create and return a new `transportista` instance, given the validated data.
        """
        pepe = ''

        pepe = ''
        print(validated_data)

        validated_data['id_localidad'] = Localidad.objects.get(id=validated_data['id_localidad'])
        validated_data['id_provincia'] = Provincia.objects.get(id=validated_data['id_provincia'])
        transportista = Transportista.objects.create(**validated_data)
        validated_data['id_provincia'] = validated_data['id_provincia'].pk
        validated_data['id_localidad'] = validated_data['id_localidad'].pk

        return validated_data

    def update(self, instance, validated_data):
        """
            Update and return an existing `transportista` instance, given the validated data.
        """

        instance.id_provincia = validated_data.get('id_provincia', instance.id_provincia)
        instance.id_localidad = validated_data.get('id_localidad', instance.id_localidad)
        instance.apellido = validated_data.get('apellido', instance.apellido)
        instance.nombre = validated_data.get('nombre', instance.nombre)
        instance.dni = validated_data.get('dni', instance.dni)
        instance.edad = validated_data.get('age', instance.edad)
        instance.sexo = validated_data.get('sexo', instance.sexo)
        instance.direccion = validated_data.get('direccion', instance.direccion)
        instance.entre_calle = validated_data.get('entre_calle', instance.entre_calle)
        instance.celular = validated_data.get('celular', instance.celular)
        instance.description = validated_data.get('description', instance.description)

        instance.save()
        return instance


class Transportistaerializer(serializers.Serializer):


    class Meta:
        model = Transportista
        fields = ('apellido', 'nombre', 'dni', 'edad', 'direccion', 'entre_calle',
                  'celular', 'telefono', 'sexo', 'mail', 'description', 'get_id_provincia', 'localidad')


    id_provincia = serializers.IntegerField()
    id_localidad = serializers.IntegerField()
    dni = serializers.IntegerField()
    apellido = serializers.CharField(required=True, allow_blank=False, max_length=100)
    nombre = serializers.CharField(required=True, allow_blank=False, max_length=100)
    edad = serializers.CharField(required=True, allow_blank=False, max_length=10)
    direccion = serializers.CharField(max_length=200)
    celular = serializers.CharField(max_length=50, allow_blank=True)
    telefono = serializers.CharField(max_length=50, allow_blank=True)
    entre_calle = serializers.CharField(max_length=200)
    mail = serializers.EmailField(max_length=100)
    description = serializers.CharField(max_length=500, allow_blank=True)
    sexo = serializers.CharField(max_length=5)



    def create(self, validated_data):
        """
        Create and return a new `transportista` instance, given the validated data.
        """
        print(validated_data)

        validated_data['id_localidad'] = Localidad.objects.get(id=validated_data['id_localidad'])
        validated_data['id_provincia'] = Provincia.objects.get(id=validated_data['id_provincia'])
        Transportista.objects.create(**validated_data)
        validated_data['id_provincia'] = validated_data['id_provincia'].pk
        validated_data['id_localidad'] = validated_data['id_localidad'].pk

        return validated_data



    def update(self, instance, validated_data):
        """
            Update and return an existing `transportista` instance, given the validated data.
        """

        instance.id_provincia = validated_data.get('id_provincia', instance.id_provincia)
        instance.id_localidad = validated_data.get('id_localidad', instance.id_localidad)
        instance.apellido = validated_data.get('apellido', instance.apellido)
        instance.nombre = validated_data.get('nombre', instance.nombre)
        instance.dni =  validated_data.get('dni', instance.dni)
        instance.edad = validated_data.get('age', instance.edad)
        instance.sexo = validated_data.get('sexo', instance.sexo)
        instance.direccion = validated_data.get('direccion', instance.direccion)
        instance.entre_calle = validated_data.get('entre_calle', instance.entre_calle)
        instance.celular = validated_data.get('celular', instance.celular)
        instance.telefono = validated_data.get('telefono', instance.telefono)
        instance.description = validated_data.get('description', instance.description)

        instance.save()
        return instance


