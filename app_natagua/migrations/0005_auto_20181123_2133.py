# Generated by Django 2.1.2 on 2018-11-23 21:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_natagua', '0004_auto_20181123_2005'),
    ]

    operations = [
        migrations.AlterField(
            model_name='listadoalumnospresentes',
            name='fecha',
            field=models.DateTimeField(),
        ),
    ]