import datetime

from rest_framework import serializers, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from api.utils import Pagination
from api.grupos.serializers import GruposPagSerializer, GruposSerializer
from app_natagua.models import Grupos


class GruposList(generics.ListAPIView):
    #queryset = Grupos.objects.get_queryset().order_by('id')
    serializer_class = GruposPagSerializer
    pagination_class = Pagination

    def get_queryset(self):
        mes = self.request.GET.get('get_mes', None)
        if mes != None:
            grupos = Grupos.objects.filter(mes__contains=3).order_by('id')
        else:
            grupos = Grupos.objects.get_queryset().order_by('id')
        return grupos

class GruposAdd(APIView):
    """
    List all snippets, or create a new snippet.
    """
    def get(self, request, format=None):
        snippets = Grupos.objects.all()
        serializer = GruposSerializer(snippets, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = GruposSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GruposDetail(APIView):

    def _getInstance(self, validated_data):
        """
            Update and return an existing `transportista` instance, given the validated data.
        """
        instance = {}

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
            object = Grupos.objects.get(pk=pk)
            return object
        except Grupos.DoesNotExist:
            from django.http import Http404
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = GruposSerializer(snippet)
        result = serializer.data

        return Response(result)

    def put(self, request, pk, format=None):
        object = self.get_object(pk)
        #fecha = datetime.datetime.strptime(request.data['fecha_nacimiento'].replace('/', '-'), '%d-%m-%Y')
        #request.data['fecha_nacimiento'] = fecha
        serializer = GruposSerializer(object, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        try:

            snippet = self.get_object(pk)
            snippet.delete()
            return Response(status=status.HTTP_200_OK)
        except Exception as error:
            errors = error.args[0]
            return Response({'error': errors}, content_type="application/json")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)