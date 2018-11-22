import datetime
from rest_framework import serializers, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from api.lista_presentes.serializers import ListaPresentePagSerializer, ListaPresenteSerializer
from api.utils import Pagination
from app_natagua.models import Grupos, ListadoAlumnosPresentes


class ListaPresenteList(generics.ListAPIView):
    queryset = ListadoAlumnosPresentes.objects.get_queryset().order_by('id')
    serializer_class = ListaPresentePagSerializer
    pagination_class = Pagination

class ListaPresenteAdd(APIView):
    """
    List all snippets, or create a new snippet.
    """
    def get(self, request, format=None):
        #objects.filter(book__libraries__id=F('id')).annotate(count_library=Count("id")
        date_start = request.GET.get('date_start', '')
        date_end = request.GET.get('date_end', '')
        grupo_id = request.GET.get('grupo_id', '')
        if date_start != '':
            date_start = datetime.datetime.strptime(date_start.replace('/', '-'), '%d-%m-%Y')
            date_start = date_start.strftime('%Y-%m-%d')

        if date_end != '':
            date_end = datetime.datetime.strptime(date_end.replace('/', '-'), '%d-%m-%Y')
            date_end = date_end.strftime('%Y-%m-%d')

        snippets = ListadoAlumnosPresentes.objects.filter(fecha__range=[date_start+' 00:00', date_end+' 11:29'], grupo_id=grupo_id).order_by('-fecha')
        serializer = ListaPresentePagSerializer(snippets, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        fecha = datetime.datetime.strptime(request.data['fecha'].replace('/', '-'), '%d-%m-%Y')
        request.data['fecha'] = fecha

        serializer = ListaPresenteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ListaPresenteDetail(APIView):

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
            object = ListadoAlumnosPresentes.objects.get(pk=pk)
            return object
        except ListadoAlumnosPresentes.DoesNotExist:
            from django.http import Http404
            raise Http404

    def put(self, request, pk, format=None):
        object = self.get_object(pk)

        fecha = datetime.datetime.strptime(request.data['fecha'].replace('/', '-'), '%d-%m-%Y')
        request.data['fecha'] = fecha

        serializer = ListaPresenteSerializer(object, data=request.data)
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