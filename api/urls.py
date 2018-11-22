# coding=utf-8
from api.alumno.views import AlumnoList, AlumnoAdd, AlumnoDetail
from api.complejo.views import ComplejoList, ComplejoAdd, ComplejoDetail

from api.direcciones.views import ProvinciaList, ProvinciaDetail, LocalidadList

from api.grupos.views import GruposList, GruposAdd, GruposDetail
from api.lista_presentes.views import ListaPresenteList, ListaPresenteAdd, ListaPresenteDetail
from api.profesores.views import ProfesorList, ProfesorAdd, ProfesorDetail
from api.transportista.views import TransportistaAdd, TransportistaDetail, TransportistaList
from api.turno.views import *
from django.conf.urls import url, include
from rest_framework import routers
from django.urls import path

router = routers.DefaultRouter()

urlpatterns = [



    url(r'^', include(router.urls)),

    url(r'listado_presente_list/', ListaPresenteList.as_view(), name='grupos_list'),
    path('listado_presente/', ListaPresenteAdd.as_view()),
    path('listado_presente/<int:pk>/', ListaPresenteDetail.as_view()),

    url(r'grupos_list/', GruposList.as_view(), name='grupos_list'),
    path('grupos/', GruposAdd.as_view()),
    path('grupos/<int:pk>/', GruposDetail.as_view()),

    url(r'complejo_list/', ComplejoList.as_view(), name='complejo_list'),
    path('complejo/', ComplejoAdd.as_view()),
    path('complejo/<int:pk>/', ComplejoDetail.as_view()),


    url(r'turno_list/', TurnoList.as_view(), name='turno_list'),
    path('turno/', TurnoAdd.as_view()),
    path('turno/<int:pk>/', TurnoDetail.as_view()),

    url(r'transportista_list/', TransportistaList.as_view(), name='transportista_list'),
    path('transportista/', TransportistaAdd.as_view()),
    path('transportista/<int:pk>/', TransportistaDetail.as_view()),

    url(r'profesor_list/', ProfesorList.as_view(), name='profesor_list'),
    path('profesor/', ProfesorAdd.as_view()),
    path('profesor/<int:pk>/', ProfesorDetail.as_view()),

    url(r'alumno_list/', AlumnoList.as_view(), name='alumno_list'),
    path('alumno/', AlumnoAdd.as_view()),
    path('alumno/<int:pk>/', AlumnoDetail.as_view()),

    #url(r'grupos_list/', GruposList.as_view(), name='grupos_list'),


    path('provincia/', ProvinciaList.as_view()),
    url(r'localidad/', LocalidadList.as_view({'get': 'get'}), name='localidad'),
    url(r'^api-auth', include('rest_framework.urls', namespace='rest_framework')),
]
