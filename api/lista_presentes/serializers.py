from rest_framework import serializers
from app_natagua.models import Grupos, Complejo, Turnos, Profesor, Alumno, ListadoAlumnosPresentes


class ListaPresentePagSerializer(serializers.ModelSerializer):

    class Meta:
        model = ListadoAlumnosPresentes
        fields = ('id', 'grupo_id', 'alumnos', 'getfecha')

        id = serializers.IntegerField(read_only=True)
        grupo_id = serializers.IntegerField()
        alumnos = serializers.PrimaryKeyRelatedField(queryset=Alumno.objects.all(), many=True)


class ListaPresenteSerializer(serializers.ModelSerializer):

    id = serializers.IntegerField(read_only=True)
    grupo_id = serializers.IntegerField()
    alumnos = serializers.PrimaryKeyRelatedField(queryset=Alumno.objects.all(), many=True)
    fecha = serializers.DateTimeField(format='YYYY-MM-DDThh:mm')


    class Meta:
        model = ListadoAlumnosPresentes
        fields = ('id', 'fecha', 'grupo_id', 'alumnos')

    def create(self, validated_data):


        alumno_data = validated_data.pop('alumnos')
        validated_data['grupo_id'] = Grupos.objects.get(id=validated_data['grupo_id'])
        validated_data['grupo_id'] = validated_data['grupo_id'].pk
        grupo = ListadoAlumnosPresentes.objects.create(**validated_data)

        for tg in alumno_data:
            grupo.alumnos.add(tg)

        return grupo

    def update(self, instance, validated_data):
        """
            Update and return an existing `Alumno` instance, given the validated data.
        """
        instance.alumnos.set(validated_data.get('alumnos', instance.alumnos))

        instance.save()

        return instance