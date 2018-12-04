import datetime
from rest_framework import serializers, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from api.factura_pagos.serializers import FacturaPagosPagSerializer, FacturaPagosSerializer
from api.utils import Pagination
from app_natagua.models import ListadoPagos, FacturaPagos


class FacturaPagosList(generics.ListAPIView):
    queryset = FacturaPagos.objects.get_queryset().order_by('id')
    serializer_class = FacturaPagosPagSerializer
    pagination_class = Pagination


class FacturaPagosAdd(APIView):
    """
    List all snippets, or create a new snippet.
    """
    def get(self, request, format=None):
        pagos = FacturaPagos.objects.all()
        serializer = FacturaPagosSerializer(pagos, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        fecha = datetime.datetime.strptime(request.data['fecha'].replace('/', '-'), '%d-%m-%Y')
        request.data['fecha'] = fecha
        serializer = FacturaPagosSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FacturaPagosDetail(APIView):

    def get_object(self, pk):
        try:
            object = FacturaPagos.objects.get(pk=pk)
            return object
        except FacturaPagos.DoesNotExist:
            from django.http import Http404
            raise Http404

    def get(self, request, pk, format=None):
        cuota = self.get_object(pk)
        serializer = FacturaPagosPagSerializer(cuota)
        result = serializer.data

        return Response(result)

    def put(self, request, pk, format=None):
        object = self.get_object(pk)
        fecha = datetime.datetime.strptime(request.data['fecha'].replace('/', '-'), '%d-%m-%Y')
        request.data['fecha'] = fecha
        serializer = FacturaPagosSerializer(object, data=request.data)
        if serializer.is_valid():
            serializer.save()
            fecha = datetime.datetime.strptime(serializer.data['fecha'][:10].replace('/', '-'), '%Y-%m-%d')
            request.data['fecha'] = fecha.strftime('%Y-%m-%d')

            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)