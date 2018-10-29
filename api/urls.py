# coding=utf-8
from api.carrier.serializers import CarrierSerializer
from api.carrier import views
from django.conf.urls import url, include
from rest_framework import routers

from api.carrier.views import CarrierViewSet

router = routers.DefaultRouter()

from rest_framework.urlpatterns import format_suffix_patterns

router = routers.DefaultRouter()



urlpatterns = [
    url(r'^', include(router.urls)),

    url(r'carrier/', views.CarrierList.as_view(), name='Carrier_list'),
    url(r'carrier/<int:pk>/', views.CarrierDetail.as_view(), name='Carrier_detail'),

    #url(r'carrier/', views.Carrier_list, name='Carrier_list'),
    #url(r'carrier/<int:pk>/', views.Carrier_detail, name='Carrier_list'),


    #url(r'carrier/', CarrierList.as_view(), name='Carrier_list'),
    #url(r'library', LibraryList.as_view(), name='library_list'),
    #url(r'author/', AuthorList.as_view(), name='author_list'),
]
