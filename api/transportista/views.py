from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, viewsets
from rest_framework import serializers, generics

from api.transportista.serializers import Transportistaerializer
from api.utils import Pagination
from app_natagua.models import Transportista



class TransportistaList(generics.ListAPIView):
    queryset = snippets = Transportista.objects.get_queryset().order_by('id')
    serializer_class = Transportistaerializer
    pagination_class = Pagination

class TransportistaAdd(APIView):
    """
    List all snippets, or create a new snippet.
    """
    def get(self, request, format=None):
        snippets = Transportista.objects.all()
        serializer = Transportistaerializer(snippets, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = Transportistaerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TransportistaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Transportista.objects.all()
    serializer_class = Transportistaerializer
