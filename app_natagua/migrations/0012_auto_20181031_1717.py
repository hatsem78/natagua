# Generated by Django 2.1.2 on 2018-10-31 17:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_natagua', '0011_auto_20181031_1707'),
    ]

    operations = [
        migrations.AlterField(
            model_name='carrier',
            name='id',
            field=models.CharField(max_length=20, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='carriertype',
            name='id',
            field=models.CharField(help_text='Id único para tipo de transportista ', max_length=20, primary_key=True, serialize=False),
        ),
    ]