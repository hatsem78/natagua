# Generated by Django 2.1.2 on 2018-12-04 11:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app_natagua', '0019_facturapagos'),
    ]

    operations = [
        migrations.RenameField(
            model_name='facturapagos',
            old_name='alumno',
            new_name='listado_pago',
        ),
    ]