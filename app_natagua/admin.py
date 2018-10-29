from django.contrib import admin
from .models import CarrierType, Carrier, MoveType, CarrierRoute, TutorRelationship, Tutor, Student, TeacherType, Teacher

# Register your models here.
#admin.site.register(CarrierType)

# Define the admin class
def definition_carrier_type(obj):
    return ("%s " % 'Nombre')

@admin.register(CarrierType)
class CarrierTypeAdmin(admin.ModelAdmin):
    list_display = (definition_carrier_type,)

admin.site.register(Carrier)
admin.site.register(MoveType)
admin.site.register(CarrierRoute)

admin.site.register(TutorRelationship)
admin.site.register(Tutor)
admin.site.register(Student)
admin.site.register(TeacherType)
admin.site.register(Teacher)
