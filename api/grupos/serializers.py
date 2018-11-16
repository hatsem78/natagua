from rest_framework import serializers
from app_natagua.models import Grupos


class GruposPagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grupos
        fields = '__all__'


