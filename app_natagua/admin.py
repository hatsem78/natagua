from django.contrib import admin
# Register your models here.
#admin.site.register(CarrierType)

# Define the admin class
from app_natagua.models import Turnos


def definition_carrier_type(obj):
    return ("%s " % 'Nombre')


admin.site.register(Turnos)
