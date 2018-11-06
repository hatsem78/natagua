from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, viewsets
from rest_framework import serializers, generics
from api.utils import Pagination
from api.Transportista.serializers import TransportistaSerializer
from app_natagua.models import Transportistas




class TransportistaList(generics.ListAPIView):
    queryset = snippets = Transportistas.objects.get_queryset().order_by('id')
    serializer_class = TransportistaSerializer
    pagination_class = Pagination

class TransportistaAdd(APIView):
    """
    List all snippets, or create a new snippet.
    """
    def get(self, request, format=None):
        snippets = Transportistas.objects.all()
        serializer = TransportistaSerializer(snippets, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = TransportistaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TransportistaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Transportistas.objects.all()
    serializer_class = TransportistaSerializer
