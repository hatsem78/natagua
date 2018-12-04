"""natagua URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf.urls import url, include
from django.urls import path



# from . import views
from app_natagua.views import index, Turnos, Transportista, Profesor, Alumno, Complejo, Grupos, ListadoPresentes, Pagos, \
    Promocion

admin.site.site_header = "Natagua Admin"
admin.site.site_title = "Natagua Admistración"
admin.site.index_title = "Bien venido Natagua Sistema"



urlpatterns = [


    url(r'^admin/', admin.site.urls),
    path('accounts/', include('django.contrib.auth.urls')),  #
    url(r'^$', index, name='index'),
    url(r'^listado_presentes/', ListadoPresentes.as_view(), name='listado_presentes'),
    url(r'^pagos/', Pagos.as_view(), name='pagos'),
    url(r'^complejo', Complejo.as_view(), name='complejo'),
    url(r'^turno$', Turnos.as_view(), name='turno'),
    url(r'^transportista$', Transportista.as_view(), name='transportista'),
    url(r'^profesor$', Profesor.as_view(), name='profesor'),
    url(r'^alumno$', Alumno.as_view(), name='alumno'),
    url(r'^grupos$', Grupos.as_view(), name='grupos'),
    url(r'^promocion$', Promocion.as_view(), name='promocion'),
    url(r'^api/', include('api.urls'), name="api"),
]



