from django.contrib import admin
# Register your models here.
#admin.site.register(CarrierType)

# Define the admin class
from app_natagua.models import Turnos, Transportista


def definition_carrier_type(obj):
    return ("%s " % 'Nombre')


admin.site.register(Turnos)
admin.site.register(Transportista)
