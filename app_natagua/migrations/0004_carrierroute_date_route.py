# Generated by Django 2.1.2 on 2018-10-29 13:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_natagua', '0003_auto_20181029_1328'),
    ]

    operations = [
        migrations.AddField(
            model_name='carrierroute',
            name='date_route',
            field=models.DateField(blank=True, null=True),
        ),
    ]