# Generated by Django 2.1.2 on 2018-11-24 11:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_natagua', '0005_auto_20181123_2133'),
    ]

    operations = [
        migrations.AddField(
            model_name='listadoalumnospresentes',
            name='presente',
            field=models.CharField(choices=[(0, 'PRESENTE'), ('H', 'AUSENTE')], db_index=True, default=0, max_length=1),
            preserve_default=False,
        ),
    ]
