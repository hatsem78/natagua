from rest_framework import generics, serializers

id = serializers.IntegerField(read_only=True)
from django.core.exceptions import ValidationError
from app_natagua.models import Transportista, Provincia, Localidad


class TransportistaPagZerializer(serializers.Serializer):
    class Meta:
        model = Transportista
        fields = fields = ('id', 'apellido', 'nombre', 'dni', 'edad', 'direccion', 'entre_calle',
                           'celular', 'telefono', 'sexo', 'fecha_nacimiento',
                           'email', 'description', 'get_id_provincia', 'localidad', 'codigo_postal')

    id = serializers.IntegerField(read_only=True)
    dni = serializers.IntegerField()
    apellido = serializers.CharField(required=True, allow_blank=False, max_length=100)
    nombre = serializers.CharField(required=True, allow_blank=False, max_length=100)
    edad = serializers.CharField(required=True, allow_blank=False, max_length=10)
    direccion = serializers.CharField(max_length=200)
    celular = serializers.CharField(max_length=50, allow_blank=True)
    telefono = serializers.CharField(max_length=50, allow_blank=True)
    entre_calle = serializers.CharField(max_length=200)
    email = serializers.EmailField(max_length=None, min_length=None, allow_blank=False)
    description = serializers.CharField(max_length=500, allow_blank=True)
    sexo = serializers.CharField(max_length=2)
    codigo_postal = serializers.CharField(max_length=5)
    fecha_nacimiento = serializers.DateTimeField()

    def create(self, validated_data):
        """
        Create and return a new `transportista` instance, given the validated data.
        """

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
        instance.email = validated_data.get('email', instance.email)
        instance.fecha_nacimiento = validated_data.get('email', instance.fecha_nacimiento)

        instance.save()
        return instance


class Transportistaerializer(serializers.Serializer):


    class Meta:
        model = Transportista
        fields = ('apellido', 'nombre', 'dni', 'edad', 'direccion', 'entre_calle',
                  'celular', 'telefono', 'sexo', 'email',
                  'description', 'fecha_nacimiento' 
                  'id_provincia', 'id_localidad', 'codigo_postal')

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
    email = serializers.EmailField(max_length=100)
    description = serializers.CharField(max_length=500, allow_blank=True)
    sexo = serializers.CharField(max_length=2)
    codigo_postal = serializers.CharField(max_length=5, allow_blank=True)
    fecha_nacimiento = serializers.DateTimeField(format='YYYY-MM-DDThh:mm')



    def create(self, validated_data):
        """
        Create and return a new `transportista` instance, given the validated data.
        """
        print(validated_data)

        validated_data['id_localidad'] = Localidad.objects.get(id=validated_data['id_localidad'])
        validated_data['id_provincia'] = Provincia.objects.get(id=validated_data['id_provincia'])

        trans = Transportista.objects.create(**validated_data)

        return trans

    def update(self, instance, validated_data):
        """
            Update and return an existing `transportista` instance, given the validated data.
        """

        instance.id_provincia = Provincia.objects.get(id=validated_data['id_provincia'])
        instance.id_localidad = Localidad.objects.get(id=validated_data['id_localidad'])
        instance.apellido = validated_data.get('apellido', instance.apellido)
        instance.nombre = validated_data.get('nombre', instance.nombre)
        instance.dni = validated_data.get('dni', instance.dni)
        instance.edad = validated_data.get('age', instance.edad)
        instance.sexo = validated_data.get('sexo', instance.sexo)
        instance.direccion = validated_data.get('direccion', instance.direccion)
        instance.entre_calle = validated_data.get('entre_calle', instance.entre_calle)
        instance.celular = validated_data.get('celular', instance.celular)
        instance.telefono = validated_data.get('telefono', instance.telefono)
        instance.description = validated_data.get('description', instance.description)
        instance.email = validated_data.get('email', instance.email)
        instance.codigo_postal = validated_data.get('codigo_postal', instance.codigo_postal)
        instance.fecha_nacimiento = validated_data.get('fecha_nacimiento',
                                                       instance.fecha_nacimiento.strftime('YYYY-MM-DDThh:mm'))
        instance.save()
        return instance

