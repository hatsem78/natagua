# Generated by Django 2.1.2 on 2018-11-08 19:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_natagua', '0010_auto_20181108_1906'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='transportista',
            name='cbu',
        ),
        migrations.AlterField(
            model_name='transportista',
            name='celular',
            field=models.CharField(default='', max_length=50, null=True),
        ),
    ]