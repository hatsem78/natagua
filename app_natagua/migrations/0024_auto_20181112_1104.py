# Generated by Django 2.1.2 on 2018-11-12 11:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_natagua', '0023_auto_20181111_1431'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='transportista',
            name='mail',
        ),
        migrations.AddField(
            model_name='transportista',
            name='codigo_postal',
            field=models.CharField(blank=True, max_length=5, null=True),
        ),
        migrations.AddField(
            model_name='transportista',
            name='email',
            field=models.EmailField(blank=True, max_length=100, null=True),
        ),
    ]