from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, viewsets
from rest_framework import generics
from api.direcciones.serializers import ProvinciaSerializer, ProvinciaLocalidadSerializer, LocalidadSerializer
from api.turno.serializers import TurnoSerializer
from app_natagua.models import Provincia, Localidad


class ProvinciaList(APIView):
    """
    List all snippets, or create a new snippet.
    """

    def get(self, request, format=None):
        snippets = Provincia.objects.all()
        serializer = ProvinciaSerializer(snippets, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = TurnoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProvinciaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Provincia.objects.all()
    serializer_class = ProvinciaLocalidadSerializer


class LocalidadList(viewsets.ViewSet):
    """
    List all snippets, or create a new snippet.
    """

    def get(self, request, format=None):
        id_provincia = request.GET.get('id_provincia', False)
        id = request.GET.get('id', False)
        if id_provincia:
            snippets = Localidad.objects.filter(id_provincia=id_provincia)
        elif id:
            snippets = Localidad.objects.filter(id=id)
        else:
            snippets = Localidad.objects.all()

        serializer = LocalidadSerializer(snippets, many=True)

        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = TurnoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
