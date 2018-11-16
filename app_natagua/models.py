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

    SEXO = (
        ('M', 'MUJER'),
        ('H', 'HOMBRE'),
    )

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

    SEXO = (
        ('M', 'MUJER'),
        ('H', 'HOMBRE'),
    )
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


class Grupos(models.Model):
    class Meta:
        verbose_name_plural = "Grupo"

    fecha = models.DateTimeField(auto_now_add=True)
    complejo = models.ForeignKey(Complejo, on_delete=models.CASCADE, null=True, blank=True)
    turno = models.ForeignKey('Turnos', related_name='grupos_turnos', on_delete=models.CASCADE)
    profesor = models.ManyToManyField('Profesor')
    edad_min = models.IntegerField(default=1)
    edad_max = models.IntegerField(default=1)
    turno = models.ManyToManyField(Turnos)

    @property
    def get_profesor(self):
        return (profesor.get_name for profesor in self.profesor.all())


class GruposAlumno(models.Model):
    class Meta:
        verbose_name_plural = "GrupoAlumnos"

    fecha = models.DateTimeField(auto_now_add=True)
    sexo = models.CharField(max_length=1, choices=SEXO, null=False, db_index=True)
    grupo = models.ManyToManyField(Grupos)
    alumonos = models.ManyToManyField(Alumno)



'''
class CarrierType(models.Model):
    """
    Modelo que representa un tipo de transportista
    """

    class Meta:
        verbose_name_plural = "Tipo de Transportista"

    id = models.AutoField(primary_key=True, help_text="Id único para tipo de transportista ")
    name = models.CharField('Nombre', max_length=200)

    def __str__(self):
        """
        Cadena que representa a la instancia particular del modelo (p. ej en el sitio de Administración)
        """
        return self.name



class MoveType(models.Model):
    """
    Modelo que representa un tipo de movimiento del transportista
    """
    class Meta:
        verbose_name_plural = "Movimiento Transportista"

    id = models.AutoField(primary_key=True, help_text="Id único tipo de movimiento ")
    name_move = models.CharField(max_length=200, help_text="Tipo movimiento del transportista")

    def __str__(self):
        """
        Cadena que representa a la instancia particular del modelo (p. ej en el sitio de Administración)
        """
        return self.name_move

class CarrierRoute(models.Model):

    class Meta:
        verbose_name_plural = "Transportista Ruta"

    id = models.AutoField(primary_key=True, help_text="Id único para ruta de  transportista ")
    origin = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    carrier = models.ForeignKey('Carrier', on_delete=models.SET_NULL, null=True)
    move_type = models.ForeignKey('MoveType', on_delete=models.SET_NULL, null=True)
    date_route = models.DateField(null=True, blank=True)

class TutorRelationship(models.Model):
    """
    Modelo que representa un tipo de transportista
    """
    class Meta:
        verbose_name_plural = "Tutor Relación"

    id = models.AutoField(primary_key=True, help_text="Id único  para tutor relación")
    name = models.CharField(max_length=200)

    def __str__(self):
        """
        Cadena que representa a la instancia particular del modelo (p. ej en el sitio de Administración)
        """
        return self.name

class Tutor(models.Model):

    class Meta:
        verbose_name_plural = "Tutor del Estudiante"

    id = models.AutoField(primary_key=True, help_text="Id único tutor ")
    last_name = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    age = models.CharField(max_length=10)
    birth_date = models.DateField(null=True, blank=True)
    address = models.CharField(max_length=200)
    mobile = models.CharField(max_length=50)
    between_street = models.CharField(max_length=200)
    cbu = models.CharField(max_length=40)
    mail = models.CharField(max_length=100)
    description = models.TextField(max_length=1000)
    tutor_relationship = models.ForeignKey('TutorRelationship', on_delete=models.SET_NULL, null=True)

class Student(models.Model):

    class Meta:
        verbose_name_plural = "Estudiante"

    id = models.AutoField(primary_key=True, help_text="Id único estudiante ")
    last_name = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    age = models.CharField(max_length=10)
    birth_date = models.DateField(null=True, blank=True)
    address = models.CharField(max_length=200)
    mobile = models.CharField(max_length=50)
    between_street = models.CharField(max_length=200)
    cbu = models.CharField(max_length=40)
    mail = models.CharField(max_length=100)
    description = models.TextField(max_length=1000)
    tutor = models.ForeignKey('tutor', on_delete=models.SET_NULL, null=True)

class TeacherType(models.Model):
    """
       Modelo que representa un tipo de profesor
    """

    class Meta:
        verbose_name_plural = "Tipo profesor"

    id = models.AutoField(primary_key=True, help_text="Id único tipo de profesor ")
    name = models.CharField(max_length=200)

    def __str__(self):
        """
        Cadena que representa a la instancia particular del modelo (p. ej en el sitio de Administración)
        """
        return self.name

class Teacher(models.Model):

    class Meta:
        verbose_name_plural = "Profesor"

    id = models.AutoField(primary_key=True, help_text="Id único para profesor ")
    last_name = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    age = models.CharField(max_length=10)
    birth_date = models.DateField(null=True, blank=True)
    address = models.CharField(max_length=200)
    mobile = models.CharField(max_length=50)
    between_street = models.CharField(max_length=200)
    cbu = models.CharField(max_length=40)
    mail = models.CharField(max_length=100)
    description = models.TextField(max_length=1000)
    teacher_type = models.ForeignKey('TeacherType', on_delete=models.SET_NULL, null=True)



class Address_custom(models.Model):
    class Meta:
        verbose_name_plural = "Dirección"

    id = models.AutoField(primary_key=True, help_text="Id único para dirección ")
    raw = models.CharField(max_length=100)
    street_number = models.CharField(max_length=10)
    route = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=10)
    state = models.CharField(max_length=100, help_text="Estado provincia ")
    state_code = models.CharField(max_length=100, help_text="Código del Estado Ejemplo Ar ")
    country = models.CharField(max_length=100, help_text="Pais ")
    country_code = models.CharField(max_length=100, help_text="Cod. Pais ")'''
