from rest_framework.response import Response
from rest_framework.utils import json
from rest_framework.views import APIView
from rest_framework import status, viewsets
from rest_framework import serializers, generics

from api.transportista.serializers import Transportistaerializer, TransportistaPagZerializer
from api.utils import Pagination
from app_natagua.models import Transportista



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
        serializer = Transportistaerializer(data=request.data)
        try:
            if serializer.is_valid():
                serializer.save()

                return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as error:
            errors = error.args[0]
            return Response({'error': errors}, content_type="application/json")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        pepe = 1
        transportista = self.get_object(pk)
        transportista.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TransportistaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Transportista.objects.all()
    serializer_class = Transportistaerializer

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
