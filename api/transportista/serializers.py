from rest_framework import generics, serializers


from app_natagua.models import Transportista






class Transportistaerializer(serializers.Serializer):

    class Meta:
        model = Transportista
        fields = ('id', 'apellido', 'nombre','dni', 'edad', 'direccion', 'entre_calle', 'celular', 'sexo', 'cbu', 'mail', 'description')

    id = serializers.IntegerField(read_only=True)
    apellido = serializers.CharField(required=True, allow_blank=False, max_length=100)
    nombre = serializers.CharField(required=True, allow_blank=False, max_length=100)
    edad = serializers.CharField(required=True, allow_blank=False, max_length=10)
    direccion = serializers.CharField(max_length=200)
    celular = serializers.CharField(max_length=50)
    entre_calle = serializers.CharField(max_length=200)
    cbu = serializers.CharField(max_length=60)
    mail = serializers.EmailField(max_length=100)
    description = serializers.CharField(max_length=500)
    sexo = serializers.CharField(max_length=500)


    def create(self, validated_data):
        """
        Create and return a new `transportista` instance, given the validated data.
        """
        return Transportista.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
            Update and return an existing `transportista` instance, given the validated data.
        """

        instance.apellido = validated_data.get('apellido', instance.apellido)
        instance.nombre = validated_data.get('nombre', instance.nombre)
        instance.dni =  validated_data.get('dni', instance.dni)
        instance.edad = validated_data.get('age', instance.edad)
        instance.sexo = validated_data.get('sexo', instance.sexo)
        instance.direccion = validated_data.get('direccion', instance.direccion)
        instance.entre_calle = validated_data.get('entre_calle', instance.entre_calle)
        instance.celular = validated_data.get('celular', instance.celular)
        instance.cbu = validated_data.get('cbu', instance.cbu)
        instance.description = validated_data.get('description', instance.description)

        instance.save()
        return instance
