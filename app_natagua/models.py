from django.db import models
import uuid # Requerida para las instancias de libros únicos
# Create your models here.


class CarrierType(models.Model):
    """
    Modelo que representa un tipo de transportista
    """

    class Meta:
        verbose_name_plural = "Tipo de Transportista"


    name = models.CharField('Nombre', max_length=200)

    def __str__(self):
        """
        Cadena que representa a la instancia particular del modelo (p. ej en el sitio de Administración)
        """
        return self.name

class Carrier(models.Model):

    class Meta:
        verbose_name_plural = "Transportista"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4,
                          help_text="ID único para este libro particular en toda la carrier")
    last_name = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    age = models.CharField(max_length=10)
    carrier_type = models.ForeignKey('CarrierType', on_delete=models.SET_NULL, null=True)
    address = models.CharField(max_length=200)
    mobile = models.CharField(max_length=50)
    between_street = models.CharField(max_length=200)
    cbu = models.CharField(max_length=40)
    mail = models.CharField(max_length=100)
    description = models.TextField(max_length=1000)

class MoveType(models.Model):
    """
    Modelo que representa un tipo de movimiento del transportista
    """
    class Meta:
        verbose_name_plural = "Movimiento Transportista"

    name_move = models.CharField(max_length=200, help_text="Tipo movimiento del transportista")

    def __str__(self):
        """
        Cadena que representa a la instancia particular del modelo (p. ej en el sitio de Administración)
        """
        return self.name_move

class CarrierRoute(models.Model):

    class Meta:
        verbose_name_plural = "Transportista Ruta"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4,
                          help_text="ID único para para este movimiento en particular")
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

    name = models.CharField(max_length=200)

    def __str__(self):
        """
        Cadena que representa a la instancia particular del modelo (p. ej en el sitio de Administración)
        """
        return self.name

class Tutor(models.Model):

    class Meta:
        verbose_name_plural = "Tutor del Estudiante"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4,
                          help_text="ID único del tutor del estudiante")
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

    id = models.UUIDField(primary_key=True, default=uuid.uuid4,
                          help_text="ID único el estudiante")
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

    name = models.CharField(max_length=200)

    def __str__(self):
        """
        Cadena que representa a la instancia particular del modelo (p. ej en el sitio de Administración)
        """
        return self.name

class Teacher(models.Model):

    class Meta:
        verbose_name_plural = "Profesor"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4,
                          help_text="ID único el profesor")
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