from rest_framework import serializers



from app_natagua.models import Grupos, Complejo, Turnos, Profesor


class GruposPagSerializer(serializers.ModelSerializer):

    class Meta:
        model = Grupos
        fields = ('id', 'getfecha', 'get_turno_name', 'get_edad', 'get_profesor')


class GruposSerializer(serializers.ModelSerializer):
    complejo_id = serializers.IntegerField()
    turno_id = serializers.IntegerField()
    profesor = serializers.PrimaryKeyRelatedField(queryset=Profesor.objects.all(), many=True, write_only=True)
    #profesor = ProfesorSerializer(many=True, read_only=True)
    edad_min = serializers.IntegerField(default=1)
    edad_max = serializers.IntegerField(default=1)
    read_only_fields = ('id')

    class Meta:
        model = Grupos
        fields = ('edad_min', 'edad_max', 'complejo_id', 'turno_id', 'profesor')

    def create(self, validated_data):

        validated_data['complejo_id'] = Complejo.objects.get(id=validated_data['complejo_id'])
        validated_data['turno_id'] = Turnos.objects.get(id=validated_data['turno_id'])
        validated_data['complejo_id'] = validated_data['complejo_id'].pk
        validated_data['turno_id'] = validated_data['turno_id'].pk
        tracks_data = validated_data.pop('profesor')
        grupo = Grupos.objects.create(**validated_data)

        for tg in tracks_data:
            grupo.profesor.add(tg)

        return grupo

