from rest_framework import serializers



from app_natagua.models import Grupos, Complejo, Turnos, Profesor, Alumno


class GruposPagSerializer(serializers.ModelSerializer):

    class Meta:
        model = Grupos
        fields = ('id', 'getfecha', 'get_turno_name', 'get_edad', 'get_profesor', 'profesor', 'alumno'
                  , 'edad_min', 'edad_max')


class GruposSerializer(serializers.ModelSerializer):

    complejo_id = serializers.IntegerField()
    turno_id = serializers.IntegerField()
    profesor = serializers.PrimaryKeyRelatedField(queryset=Profesor.objects.all(), many=True)
    alumno = serializers.PrimaryKeyRelatedField(queryset=Alumno.objects.all(), many=True)
    edad_min = serializers.IntegerField(default=1)
    edad_max = serializers.IntegerField(default=1)

    class Meta:
        model = Grupos
        fields = ('edad_min', 'edad_max', 'complejo_id', 'turno_id', 'profesor', 'alumno', 'mes', 'get_profesor')

    def create(self, validated_data):

        validated_data['complejo_id'] = Complejo.objects.get(id=validated_data['complejo_id'])
        validated_data['turno_id'] = Turnos.objects.get(id=validated_data['turno_id'])
        validated_data['complejo_id'] = validated_data['complejo_id'].pk
        validated_data['turno_id'] = validated_data['turno_id'].pk
        profesor_data = validated_data.pop('profesor')
        alumno_data = validated_data.pop('alumno')
        grupo = Grupos.objects.create(**validated_data)

        for tg in profesor_data:
            grupo.profesor.add(tg)

        for tg in alumno_data:
            grupo.alumno.add(tg)

        return grupo

    def update(self, instance, validated_data):
        """
            Update and return an existing `Alumno` instance, given the validated data.
        """
        instance.edad_min = validated_data.get('edad_min', instance.edad_min)
        instance.edad_max = validated_data.get('edad_max', instance.edad_max)
        instance.complejo_id = validated_data.get('complejo_id', instance.complejo_id)
        instance.turno_id = validated_data.get('turno_id', instance.turno_id)
        instance.profesor.set(validated_data.get('profesor', instance.profesor))
        instance.alumno.set(validated_data.get('alumno', instance.alumno))
        instance.mes = validated_data.get('mes', instance.mes)

        instance.save()

        return instance