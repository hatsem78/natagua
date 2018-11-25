from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework import generics

from api.complejo.serializers import ComplejoSerializer
from api.utils import Pagination

from app_natagua.models import Complejo


class ComplejoList(generics.ListAPIView):
    queryset = Complejo.objects.get_queryset().order_by('id')
    serializer_class = ComplejoSerializer
    pagination_class = Pagination


class ComplejoAdd(APIView):
    """
    List all snippets, or create a new snippet.
    """
    def get(self, request, format=None):
        snippets = Complejo.objects.all()
        serializer = ComplejoSerializer(snippets, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ComplejoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ComplejoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Complejo.objects.all()
    serializer_class = ComplejoSerializer
