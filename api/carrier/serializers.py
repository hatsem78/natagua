
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from rest_framework import generics, serializers
from rest_framework import status




'''class Pagination(PageNumberPagination):
    page_size = 100

    def get_paginated_response(self, data):
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'total_pages': self.page.paginator.num_pages,
            'count': self.page.paginator.count,
            'results': data
        })


class CarrierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carrier
        fields = ('id', 'last_name', 'name', 'age', 'direccion', 'celular', 'between_street', 'cbu', 'mail', 'description')

class CarrierSerializerss(serializers.Serializer):

    last_name = serializers.CharField(max_length=100)
    name = serializers.CharField(max_length=100)
    age = serializers.CharField(max_length=10)
    direccion = serializers.CharField(max_length=200)
    celular = serializers.CharField(max_length=50)
    between_street = serializers.CharField(max_length=200)
    cbu = serializers.CharField(max_length=60)
    mail = serializers.CharField(max_length=100)
    description = serializers.CharField(max_length=100)

    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return Carrier.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Snippet` instance, given the validated data.
        """
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.name = validated_data.get('name', instance.name)
        instance.age = validated_data.get('age', instance.age)
        instance.direccion = validated_data.get('direccion', instance.direccion)
        instance.celular = validated_data.get('celular', instance.celular)
        instance.between_street = validated_data.get('between_street', instance.between_street)
        instance.cbu = validated_data.get('cbu', instance.cbu)
        instance.mail = validated_data.get('mail', instance.mail)
        instance.description = validated_data.get('description', instance.description)

        instance.save()
        return instance



class Carrier(generics.ListAPIView):
    queryset = Carrier.objects.all()
    serializer_class = CarrierSerializer
    #pagination_class = Pagination



'''



