from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, viewsets
from rest_framework import serializers, generics
from api.utils import Pagination
from api.turno.serializers import TurnoSerializer
from app_natagua.models import Turnos

class TurnoList(generics.ListAPIView):
    queryset = snippets = Turnos.objects.get_queryset().order_by('id')
    serializer_class = TurnoSerializer
    pagination_class = Pagination


class TurnoAdd(APIView):
    """
    List all snippets, or create a new snippet.
    """
    def get(self, request, format=None):
        snippets = Turnos.objects.all()
        serializer = TurnoSerializer(snippets, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = TurnoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TurnoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Turnos.objects.all()
    serializer_class = TurnoSerializer
