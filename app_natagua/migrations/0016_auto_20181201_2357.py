# Generated by Django 2.1.2 on 2018-12-01 23:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app_natagua', '0015_auto_20181201_1254'),
    ]

    operations = [
        migrations.AlterField(
            model_name='listadopagos',
            name='turno',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app_natagua.Promocion'),
        ),
    ]
