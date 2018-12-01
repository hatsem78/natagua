import datetime

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


class PromocionAdd(APIView):
    """
    List all snippets, or create a new snippet.
    """
    def get(self, request, format=None):
        snippets = Promocion.objects.all()
        serializer = PromocionSerializer(snippets, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        if request.data['fecha_expiracion'] == '':
            request.data['fecha_expiracion'] = '01-01-1900'
        fecha = datetime.datetime.strptime(request.data['fecha_expiracion'].replace('/', '-'), '%d-%m-%Y')
        request.data['fecha_expiracion'] = fecha
        serializer = PromocionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PromocionDetail(APIView):

    def get_object(self, pk):
        try:
            object = Promocion.objects.get(pk=pk)
            return object
        except Promocion.DoesNotExist:
            from django.http import Http404
            raise Http404

    def get(self, request, pk, format=None):
        cuota = self.get_object(pk)
        serializer = PromocionSerializer(cuota)
        result = serializer.data

        return Response(result)

    def put(self, request, pk, format=None):
        object = self.get_object(pk)
        if request.data['fecha_expiracion'] == '':
            request.data['fecha_expiracion'] = '01-01-1900'
        fecha = datetime.datetime.strptime(request.data['fecha_expiracion'].replace('/', '-'), '%d-%m-%Y')
        request.data['fecha_expiracion'] = fecha
        serializer = PromocionSerializer(object, data=request.data)
        if serializer.is_valid():
            serializer.save()
            fecha = datetime.datetime.strptime(serializer.data['fecha_expiracion'][:10].replace('/', '-'), '%Y-%m-%d')
            request.data['fecha_expiracion'] = fecha.strftime('%Y-%m-%d')

            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
