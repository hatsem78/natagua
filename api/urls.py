# coding=utf-8
from api.direcciones.serializers import ProvinciaSerializer
from api.direcciones.views import ProvinciaList, ProvinciaDetail
from api.transportista.views import TransportistaAdd, TransportistaDetail, TransportistaList
from api.turno.views import *
from django.conf.urls import url, include
from rest_framework import routers
from django.urls import path



router = routers.DefaultRouter()



router = routers.DefaultRouter()



urlpatterns = [

    url(r'^', include(router.urls)),
    url(r'turno_list/', TurnoList.as_view(), name='turno_list'),
    path('turno/', TurnoAdd.as_view()),
    path('turno/<int:pk>/', TurnoDetail.as_view()),

    url(r'transportista_list/', TransportistaList.as_view(), name='transportista_list'),
    path('transportista/', TransportistaAdd.as_view()),
    path('transportista/<int:pk>/', TransportistaDetail.as_view()),

    path('provincia/', ProvinciaList.as_view()),
    path('provincia/<int:pk>/', ProvinciaDetail.as_view()),
]
