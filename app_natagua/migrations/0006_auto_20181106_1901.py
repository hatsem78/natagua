# Generated by Django 2.1.2 on 2018-11-06 19:01

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_natagua', '0005_auto_20181106_1421'),
    ]

    operations = [
        migrations.AddField(
            model_name='transportista',
            name='fecha_creacion',
            field=models.DateTimeField(default=datetime.datetime.now),
        ),
        migrations.AddField(
            model_name='transportista',
            name='fecha_nacimiento',
            field=models.DateTimeField(blank=True, default=datetime.datetime.now),
        ),
        migrations.AlterField(
            model_name='transportista',
            name='apellido',
            field=models.CharField(db_index=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='transportista',
            name='dni',
            field=models.CharField(max_length=25, unique=True),
        ),
        migrations.AlterField(
            model_name='transportista',
            name='nombre',
            field=models.CharField(db_index=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='transportista',
            name='sexo',
            field=models.CharField(choices=[('M', 'MUJER'), ('H', 'HOMBRE')], db_index=True, max_length=1),
        ),
        migrations.AddIndex(
            model_name='transportista',
            index=models.Index(fields=['apellido', 'nombre'], name='app_natagua_apellid_78ce4e_idx'),
        ),
        migrations.AddIndex(
            model_name='transportista',
            index=models.Index(fields=['apellido', 'dni'], name='apellido_dni_idx'),
        ),
    ]
