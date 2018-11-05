# coding=utf-8
from api.turno.views import *
from django.conf.urls import url, include
from rest_framework import routers
from django.urls import path



router = routers.DefaultRouter()



router = routers.DefaultRouter()



urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'turno_list/', TurnoList.as_view(), name='turno_list'),

#    url(r'turno_action/', TurnoDetail, name='turno_action'),
    path('turno/', TurnoAdd.as_view()),
    path('turno/<int:pk>/', TurnoDetail.as_view()),

    #url(r'carrier/', views.CarrierList.as_view(), name='Carrier_list'),
    #url(r'carrier/<int:pk>/', views.CarrierDetail.as_view(), name='Carrier_detail'),

    #url(r'carrier/', views.Carrier_list, name='Carrier_list'),
    #url(r'carrier/<int:pk>/', views.Carrier_detail, name='Carrier_list'),


    #url(r'carrier/', CarrierList.as_view(), name='Carrier_list'),
    #url(r'library', LibraryList.as_view(), name='library_list'),
    #url(r'author/', AuthorList.as_view(), name='author_list'),
]
