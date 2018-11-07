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
from django.conf.urls import url
from django.conf import settings
from django.contrib import admin
from django.conf.urls import url, include
from django.urls import path
from django.views.generic import TemplateView


# from . import views
from app_natagua.views import index, Turnos, Transportista

admin.site.site_header = "Natagua Admin"
admin.site.site_title = "Natagua Admistración"
admin.site.index_title = "Bien venido Natagua Sistema"



urlpatterns = [

    url(r'^admin/', admin.site.urls),
    path('accounts/', include('django.contrib.auth.urls')),  #
    url(r'^$', index, name='index'),
    url(r'^turno$', Turnos.as_view(), name='turno'),
    url(r'^transportista$', Transportista.as_view(), name='transportista'),
    url(r'^admin_tools/', include('admin_tools.urls')),
    url(r'^api/', include('api.urls'), name="api"),
]



