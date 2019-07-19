#! -.- coding: utf-8 -.-
import datetime

from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.db import models
import uuid # Requerida para las instancias de libros únicos
# Create your models here.

SEXO = (
    ('M', 'MUJER'),
    ('H', 'HOMBRE'),
)

PRESENTE = (
    (0, 'PRESENTE'),
    ('H', 'AUSENTE'),
)

MES = (
    ('1', 'Enero'),
    ('2', 'Febrero'),
    ('3', 'Marzo'),
    ('4', 'Abril'),
    ('5', 'Mayo'),
    ('6', 'Junio'),
    ('7', 'Julio'),
    ('8', 'Agosto'),
    ('9', 'Septiembre'),
    ('10', 'Octubre'),
    ('11', 'Noviembre'),
    ('12', 'Diciembre'),
)

FORMA_PAGO = (
    (1, 'Efectivo'),
    (2, 'CBU'),
    (3, 'Factura'),
 )

MES_LIST = {
    1: 'Enero',
    2: 'Febrero',
    3: 'Marzo',
    4: 'Abril',
    5: 'Mayo',
    6: 'Junio',
    7: 'Julio',
    8: 'Agosto',
    9: 'Septiembre',
    10: 'Octubre',
    11: 'Noviembre',
    12: 'Diciembre',
}
def _validate_number(value):
    if type(value) == int:  # Your conditions here
        raise ValidationError('%s some error message' % value)

class Provincia(models.Model):
    """
        Modelo que representa una provincia
    """

    class Meta:
        verbose_name_plural = "Provincia"
        ordering = ['nombre']

    id = models.AutoField(primary_key=True, help_text="Id único de provincia ")
    nombre = models.CharField('Nombre', max_length=50)
    def __str__(self):
        return '%d: %s' % (self.id, self.nombre)

class Localidad(models.Model):
    """
        Modelo que representa una Localidad
    """
    class Meta:
        verbose_name_plural = "Localidad"
        unique_together = ('id_provincia', 'id')
        ordering = ['nombre']

    id = models.AutoField(primary_key=True, help_text="Id único de Localidad ")
    id_provincia = models.ForeignKey('Provincia', related_name='provincia_localidad', on_delete=models.CASCADE, null=True)
    nombre = models.CharField('Nombre', max_length=50)
    codigopostal = models.CharField('Código Postal', max_length=10)

    def __str__(self):
        return '%d: %s %s' % (self.id, self.nombre, self.codigopostal)

class Complejo(models.Model):
    """
        Modelo que representa un de Complejo
    """

    class Meta:
        verbose_name_plural = "Complejo"

    id = models.AutoField(primary_key=True, help_text="Id único de Complejo ")
    nombre = models.CharField( max_length=50, unique=True)
    telefono = models.CharField('Telefono', max_length=50)
    direccion = models.CharField(max_length=200, blank=True, null=True)
    email = models.EmailField(max_length=100, blank=True, null=True,)
    description = models.TextField(max_length=1000, blank=True, null=True)

    def __str__(self):
        """
        Cadena que representa a la instancia particular del modelo (p. ej en el sitio de Administración)
        """
        return self.nombre

class Turnos(models.Model):
    """
        Modelo que representa un de turno
    """

    class Meta:
        verbose_name_plural = "Turnos"

    id = models.AutoField(primary_key=True, help_text="Id único de turno ")
    nombre = models.CharField('Nombre', max_length=200)


    def __str__(self):
        """
        Cadena que representa a la instancia particular del modelo (p. ej en el sitio de Administración)
        """
        return self.nombre

class Transportista(models.Model):

    class Meta:
        verbose_name_plural = "Transportista"
        indexes = [
            models.Index(fields=['apellido', 'nombre']),
            models.Index(fields=['apellido', 'dni'], name='apellido_dni_idx'),
        ]
        ordering = ('apellido', 'nombre')

    id = models.AutoField(primary_key=True, help_text="Id único para transportista ")
    user = models.OneToOneField(User, on_delete=models.SET_NULL, null=True, blank=True)
    apellido = models.CharField(max_length=100, null=False, db_index=True)
    nombre = models.CharField(max_length=100, null=False, db_index=True)
    dni = models.CharField(max_length=25, unique=True)
    edad = models.CharField(max_length=10)
    sexo = models.CharField(max_length=1, choices=SEXO, null=False, db_index=True)
    direccion = models.CharField(max_length=200, blank=True, null=True)
    entre_calle = models.CharField(max_length=200, blank=True, null=True)
    celular = models.CharField(max_length=50, blank=True, null=True)
    telefono = models.CharField(max_length=50, blank=True, null=True)
    email = models.EmailField(max_length=100, blank=True, null=True)
    description = models.TextField(max_length=1000, blank=True, null=True)
    fecha_nacimiento = models.DateTimeField(auto_now_add=True)
    id_provincia = models.ForeignKey('Provincia', related_name='provincia', on_delete=models.CASCADE, null=True)
    id_localidad = models.ForeignKey('Localidad', related_name='localidad', on_delete=models.CASCADE, null=True)
    codigo_postal = models.CharField(max_length=5, blank=True, null=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

class Profesor(models.Model):

    class Meta:
        verbose_name = "Profesor"
        verbose_name_plural = "Profesores"
        indexes = [
            models.Index(fields=['apellido', 'nombre'], name='prof_apellido_nombre_idx'),
            models.Index(fields=['apellido', 'dni'], name='prof_apellido_dni'),
        ]
        ordering = ('apellido', 'nombre')

    id = models.AutoField(primary_key=True, help_text="Id único para Profesor ")
    user = models.OneToOneField(User, on_delete=models.SET_NULL, null=True, blank=True)
    apellido = models.CharField(max_length=100, null=False, db_index=True)
    nombre = models.CharField(max_length=100, null=False, db_index=True)
    dni = models.CharField(max_length=25, unique=True)
    edad = models.CharField(max_length=10)
    sexo = models.CharField(max_length=1, choices=SEXO, null=False, db_index=True)
    direccion = models.CharField(max_length=200, blank=True, null=True)
    entre_calle = models.CharField(max_length=200, blank=True, null=True)
    celular = models.CharField(max_length=50, blank=True, null=True)
    telefono = models.CharField(max_length=50, blank=True, null=True)
    email = models.EmailField(max_length=100, blank=True, null=True)
    description = models.TextField(max_length=1000, blank=True, null=True)
    fecha_nacimiento = models.DateTimeField(auto_now_add=True)
    id_provincia = models.ForeignKey('Provincia', related_name='provincia_profesor', on_delete=models.CASCADE, null=True)
    id_localidad = models.ForeignKey('Localidad', related_name='localidad_profesor', on_delete=models.CASCADE, null=True)
    codigo_postal = models.CharField(max_length=5, blank=True, null=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    @property
    def get_name(self):
        return "%s %s" % (self.apellido, self.nombre)

class Alumno(models.Model):

    class Meta:
        verbose_name = "name"
        verbose_name_plural = "Alumno"
        indexes = [
            models.Index(fields=['apellido', 'nombre'], name='alumno_apellido_nombre_idx'),
            models.Index(fields=['apellido', 'dni'], name='alumno_apellido_dni'),
        ]
        ordering = ('apellido', 'nombre')

    id = models.AutoField(primary_key=True, help_text="Id único para alumno ")
    apellido = models.CharField(max_length=100, null=False, db_index=True)
    nombre = models.CharField(max_length=100, null=False, db_index=True)
    dni = models.CharField(max_length=25, unique=True)
    edad = models.CharField(max_length=10)
    sexo = models.CharField(max_length=1, choices=SEXO, null=False, db_index=True)
    direccion = models.CharField(max_length=200, blank=True, null=True)
    entre_calle = models.CharField(max_length=200, blank=True, null=True)
    celular = models.CharField(max_length=50, blank=True, null=True)
    telefono = models.CharField(max_length=50, blank=True, null=True)
    email = models.EmailField(max_length=100, blank=True, null=True)
    description = models.TextField(max_length=1000, blank=True, null=True)
    fecha_nacimiento = models.DateTimeField(auto_now_add=True)
    id_provincia = models.ForeignKey('Provincia', related_name='provincia_alumno', on_delete=models.CASCADE, null=True)
    id_localidad = models.ForeignKey('Localidad', related_name='localidad_alumno', on_delete=models.CASCADE, null=True)
    codigo_postal = models.CharField(max_length=5, blank=True, null=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    activo = models.BooleanField(default=True)

    @property
    def get_fullName(self):
        return "%s %s" % (self.apellido, self.nombre)

class Grupos(models.Model):
    class Meta:
        verbose_name_plural = "Grupos"

    fecha = models.DateTimeField(auto_now_add=True)
    mes = models.CharField(max_length=1, choices=MES, null=False, db_index=True)
    complejo = models.ForeignKey(Complejo, on_delete=models.CASCADE)
    turno = models.ForeignKey(Turnos, on_delete=models.CASCADE)
    edad_min = models.IntegerField(default=1)
    edad_max = models.IntegerField(default=1)
    profesor = models.ManyToManyField('Profesor')
    alumno = models.ManyToManyField(Alumno)

    @property
    def get_profesor(self):
        return ', '.join(profesor.get_name for profesor in self.profesor.all())

    @property
    def getfecha(self):
        fecha = datetime.datetime.strptime(str(self.fecha).replace('/', '-')[:10], '%Y-%m-%d')
        return fecha.strftime('%d/%m/%Y')

    @property
    def get_turno_name(self):
        return self.turno.nombre

    @property
    def get_mes(self):
        return MES_LIST[int(self.mes)]

    @property
    def get_edad(self):
        edad = ''
        if self.edad_min == self.edad_max:
                edad = str(self.edad_min)
        else:
            str(self.edad_min) + ' ' + str(self.edad_max)
        return edad

class ListadoAlumnosPresentes(models.Model):
    class Meta:
        verbose_name_plural = "ListadoAlumnosPresente"

    grupo = models.ForeignKey(Grupos, on_delete=models.CASCADE)
    alumnos = models.ManyToManyField(Alumno)
    fecha = models.DateTimeField()

    @property
    def getfecha(self):
        fecha = datetime.datetime.strptime(str(self.fecha).replace('/', '-')[:10], '%Y-%m-%d')
        return fecha.strftime('%d-%m-%Y')

class Promocion(models.Model):
    class Meta:
        verbose_name_plural = "Promocion"

    fecha = models.DateTimeField(auto_now_add=True)
    nombre = models.CharField(max_length=100, null=False, db_index=True)
    porcentaje = models.CharField(max_length=3, blank=True, null=True)
    fecha_expiracion = models.DateTimeField(null=True)
    expiracion = models.BooleanField(default=False)
    activo = models.BooleanField(default=True)
    description = models.TextField(max_length=1000, blank=True, null=True)


class ListadoPagos(models.Model):
    class Meta:
        verbose_name_plural = "Listado_pagos"

    alumno = models.ForeignKey(Alumno, on_delete=models.CASCADE)
    complejo = models.ForeignKey(Complejo, on_delete=models.CASCADE)
    turno = models.ForeignKey(Turnos, on_delete=models.CASCADE)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha = models.DateTimeField()
    promocion_id = models.IntegerField(default=1)
    cuota = models.DecimalField(max_digits=6, decimal_places=2, default=0.00)
    matricula = models.DecimalField(max_digits=6, decimal_places=2, default=0.00)
    adicional = models.DecimalField(max_digits=6, decimal_places=2, default=0.00)
    pre_hora = models.DecimalField(max_digits=6, decimal_places=2, default=0.00)
    transporte = models.DecimalField(max_digits=6, decimal_places=2, default=0.00)
    total_pagar = models.DecimalField(max_digits=6, decimal_places=2, default=0.00)
    pago_parcial = models.DecimalField(max_digits=6, decimal_places=2, default=0.00)
    faltante = models.DecimalField(max_digits=6, decimal_places=2, default=0.00)
    forma_pago = models.CharField(max_length=1, choices=FORMA_PAGO, null=False, db_index=True)
    activo = models.BooleanField(default=True)
    description = models.TextField(max_length=1000, blank=True, null=True)


    @property
    def fecha_creacion(self):
        fecha = datetime.datetime.strptime(str(self.fecha).replace('/', '-')[:10], '%Y-%m-%d')
        return self.fecha_creacion.strftime('%d-%m-%Y')

    @property
    def fecha_creacion(self):
        fecha = datetime.datetime.strptime(str(self.fecha).replace('/', '-')[:10], '%Y-%m-%d')
        return self.fecha.strftime('%d-%m-%Y')

    @property
    def get_alumno(self):
        return {
            'fullName': self.alumno.apellido + ', ' + self.alumno.nombre,
            'direccion': self.alumno.direccion,
            'dni': self.alumno.dni,
            'email': self.alumno.email,
        }

class FacturaPagos(models.Model):
    class Meta:
        verbose_name_plural = "FacturaPagos"

    listado_pago = models.ForeignKey(ListadoPagos, on_delete=models.CASCADE)
    pago = models.DecimalField(max_digits=6, decimal_places=2, default=0.00)
    fecha = models.DateTimeField(auto_now_add=True)

