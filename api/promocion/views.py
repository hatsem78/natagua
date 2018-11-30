from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework import generics

from api.promocion.serializers import PromocionPagSerializer, PromocionSerializer
from api.utils import Pagination

from app_natagua.models import Promocion


class PromocionList(generics.ListAPIView):
    queryset = Promocion.objects.get_queryset().order_by('id')
    serializer_class = PromocionPagSerializer
    pagination_class = Pagination


class ComplejoAdd(APIView):
    """
    List all snippets, or create a new snippet.
    """
    def get(self, request, format=None):
        snippets = Promocion.objects.all()
        serializer = PromocionSerializer(snippets, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = PromocionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ComplejoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Promocion.objects.all()
    serializer_class = PromocionSerializer
