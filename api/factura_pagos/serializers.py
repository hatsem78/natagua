from rest_framework import serializers

from app_natagua.models import ListadoPagos, FacturaPagos


class FacturaPagosPagSerializer(serializers.ModelSerializer):

    class Meta:
        model = FacturaPagos
        fields = (
            'id',
            'listado_pago',
            'fecha',
            'pago',
        )




class FacturaPagosSerializer(serializers.ModelSerializer):

    listado_pago_id = serializers.IntegerField()
    fecha = serializers.DateTimeField()
    pago = serializers.DecimalField(max_digits=6, decimal_places=2, default=0.00)

    class Meta:
        model = FacturaPagos
        fields = (
            'listado_pago_id',
            'fecha',
            'pago',
        )

    def create(self, validated_data):

        validated_data['listado_pago_id'] = ListadoPagos.objects.get(id=validated_data['listado_pago_id'])
        validated_data['listado_pago_id'] = validated_data['listado_pago_id'].pk

        factura_pagos = FacturaPagos.objects.create(**validated_data)

        return factura_pagos

    def update(self, instance, validated_data):
        """
            Update and return an existing `pago` instance, given the validated data.
        """
        instance.listado_pago_id = validated_data.get('listado_pago_id', instance.listado_pago_id)
        instance.fecha = validated_data.get('fecha', instance.fecha)
        instance.pago = validated_data.get('cuota', instance.pago)

        instance.save()

        return instance