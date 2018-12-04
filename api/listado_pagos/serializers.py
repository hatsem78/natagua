from rest_framework import serializers

from app_natagua.models import ListadoPagos, Complejo, Turnos, Alumno, Promocion


class ListaPagosPagSerializer(serializers.ModelSerializer):

    class Meta:
        model = ListadoPagos
        fields = (
            'id',
            'alumno_id', 'fecha', 'cuota',
            'matricula', 'adicional', 'pre_hora',
            'transporte', 'total_pagar', 'pago_parcial',
            'faltante', 'complejo_id', 'turno_id', 'get_alumno',
            'description', 'forma_pago', 'promocion_id'
        )




class ListaPagosSerializer(serializers.ModelSerializer):


    alumno_id = serializers.IntegerField()
    complejo_id = serializers.IntegerField()
    promocion_id = serializers.IntegerField()
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
    forma_pago = serializers.IntegerField()
    description = serializers.CharField(max_length=500, allow_blank=True)


    class Meta:
        model = ListadoPagos
        fields = (
            'alumno_id', 'fecha', 'cuota',
            'matricula', 'adicional', 'pre_hora',
            'transporte', 'total_pagar', 'pago_parcial',
            'faltante', 'complejo_id', 'turno_id',
            'description', 'forma_pago', 'promocion_id'
        )

    def create(self, validated_data):

        validated_data['complejo_id'] = Complejo.objects.get(id=validated_data['complejo_id'])
        validated_data['alumno_id'] = Alumno.objects.get(id=validated_data['alumno_id'])
        validated_data['turno_id'] = Turnos.objects.get(id=validated_data['turno_id'])
        validated_data['promocion_id'] = Promocion.objects.get(id=validated_data['promocion_id'])
        validated_data['complejo_id'] = validated_data['complejo_id'].pk
        validated_data['turno_id'] = validated_data['turno_id'].pk
        validated_data['alumno_id'] = validated_data['alumno_id'].pk
        validated_data['promocion_id'] = validated_data['promocion_id'].pk

        pagos = ListadoPagos.objects.create(**validated_data)

        return pagos

    def update(self, instance, validated_data):
        """
            Update and return an existing `pago` instance, given the validated data.
        """
        instance.alumno_id = validated_data.get('alumno_id', instance.alumno_id)
        instance.complejo_id = validated_data.get('complejo_id', instance.complejo_id)
        instance.turno_id = validated_data.get('turno_id', instance.turno_id)
        instance.fecha = validated_data.get('fecha', instance.fecha)
        instance.cuota = validated_data.get('cuota', instance.cuota)
        instance.matricula = validated_data.get('matricula', instance.matricula)
        instance.adicional = validated_data.get('adicional', instance.adicional)
        instance.pre_hora = validated_data.get('pre_hora', instance.pre_hora)
        instance.transporte = validated_data.get('transporte', instance.transporte)
        instance.total_pagar = validated_data.get('total_pagar', instance.total_pagar)
        instance.pago_parcial = validated_data.get('pago_parcial', instance.pago_parcial)
        instance.faltante = validated_data.get('faltante', instance.faltante)
        instance.forma_pago = validated_data.get('forma_pago', instance.forma_pago)
        instance.description = validated_data.get('description', instance.description)
        instance.promocion_id = validated_data.get('promocion_id', instance.promocion_id)

        instance.save()

        return instance