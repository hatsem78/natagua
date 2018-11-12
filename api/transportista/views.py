import datetime

from rest_framework.response import Response
from rest_framework.utils import json
from rest_framework.views import APIView
from rest_framework import status, viewsets
from rest_framework import serializers, generics

from api.transportista.serializers import Transportistaerializer, TransportistaPagZerializer
from api.utils import Pagination
from app_natagua.models import Transportista, Localidad, Provincia


class TransportistaList(generics.ListAPIView):
    queryset = snippets = Transportista.objects.get_queryset().order_by('id')
    serializer_class = TransportistaPagZerializer
    pagination_class = Pagination



class TransportistaAdd(APIView):
    """
    List all snippets, or create a new snippet.
    """
    def get(self, request, format=None):
        snippets = Transportista.objects.all()
        serializer = TransportistaPagZerializer(snippets, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        fecha = datetime.datetime.strptime(request.data['fecha_nacimiento'].replace('/', '-'), '%d-%m-%Y')
        request.data['fecha_nacimiento'] = fecha
        serializer = Transportistaerializer(data=request.data)
        try:
            if serializer.is_valid():
                serializer.save()
                serializer.initial_data['id'] = serializer.instance.id
                return Response(serializer.initial_data, status=status.HTTP_201_CREATED)
        except Exception as error:
            errors = error.args[0]
            return Response({'error': errors}, content_type="application/json")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TransportistaDetail(APIView):

    def _getInstance(self, validated_data):
        """
            Update and return an existing `transportista` instance, given the validated data.
        """
        instance = {}
        instance['id'] = validated_data.id
        instance['id_provincia'] = validated_data.id_provincia_id
        instance['id_localidad'] = validated_data.id_localidad_id
        instance['apellido'] = validated_data.apellido
        instance['nombre'] = validated_data.nombre
        instance['dni'] = validated_data.dni
        instance['edad'] = validated_data.edad
        instance['sexo'] = validated_data.sexo
        instance['email'] = validated_data.email
        instance['celular'] = validated_data.celular
        instance['telefono'] = validated_data.telefono
        instance['fecha_nacimiento'] = validated_data.fecha_nacimiento.strftime('%d/%m/%Y')
        instance['direccion'] = validated_data.direccion
        instance['entre_calle'] = validated_data.entre_calle
        instance['celular'] = validated_data.celular
        instance['telefono'] = validated_data.telefono
        instance['description'] = validated_data.description
        instance['codigo_postal'] = validated_data.codigo_postal

        return instance

    def get_object(self, pk):
        try:
            object = Transportista.objects.get(pk=pk)
            return object
        except Transportista.DoesNotExist:
            from django.http import Http404
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = Transportistaerializer(snippet)
        result = self._getInstance(snippet)

        return Response(result)

    def put(self, request, pk, format=None):
        object = self.get_object(pk)
        fecha = datetime.datetime.strptime(request.data['fecha_nacimiento'].replace('/', '-'), '%d-%m-%Y')
        request.data['fecha_nacimiento'] = fecha
        serializer = Transportistaerializer(object, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(self._getInstance(serializer.instance))
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)