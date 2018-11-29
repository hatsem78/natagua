from rest_framework import serializers

from app_natagua.models import ListadoPagos, Complejo, Turnos, Alumno


class ListaPagosPagSerializer(serializers.ModelSerializer):

    class Meta:
        model = ListadoPagos
        fields = (
            'id',
            'alumno_id', 'fecha', 'cuota',
            'matricula', 'adicional', 'pre_hora',
            'transporte', 'total_pagar', 'pago_parcial',
            'faltante', 'complejo_id', 'turno_id', 'get_alumno'
        )




class ListaPagosSerializer(serializers.ModelSerializer):


    alumno_id = serializers.IntegerField()
    complejo_id = serializers.IntegerField()
    turno_id = serializers.IntegerField()
    fecha = serializers.DateTimeField()
    cuota = serializers.DecimalField(max_digits=6, decimal_places=2, default=0.00)
    matricula = serializers.DecimalField(max_digits=6, decimal_places=2, default=0.00)
    adicional = serializers.DecimalField(max_digits=6, decimal_places=2, default=0.00)
    pre_hora = serializers.DecimalField(max_digits=6, decimal_places=2, default=0.00)
    transporte = serializers.DecimalField(max_digits=6, decimal_places=2, default=0.00)
    total_pagar = serializers.DecimalField(max_digits=6, decimal_places=2, default=0.00)
    pago_parcial = serializers.DecimalField(max_digits=6, decimal_places=2, default=0.00)
    faltante = serializers.DecimalField(max_digits=6, decimal_places=2, default=0.00)


    class Meta:
        model = ListadoPagos
        fields = (
            'alumno_id', 'fecha', 'cuota',
            'matricula', 'adicional', 'pre_hora',
            'transporte', 'total_pagar', 'pago_parcial',
            'faltante', 'complejo_id', 'turno_id'
        )

    def create(self, validated_data):

        validated_data['complejo_id'] = Complejo.objects.get(id=validated_data['complejo_id'])
        validated_data['alumno_id'] = Alumno.objects.get(id=validated_data['alumno_id'])
        validated_data['turno_id'] = Turnos.objects.get(id=validated_data['turno_id'])
        validated_data['complejo_id'] = validated_data['complejo_id'].pk
        validated_data['turno_id'] = validated_data['turno_id'].pk
        validated_data['alumno_id'] = validated_data['alumno_id'].pk



        pagos = ListadoPagos.objects.create(**validated_data)



        return pagos

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