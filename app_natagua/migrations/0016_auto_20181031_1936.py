# Generated by Django 2.1.2 on 2018-10-31 19:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_natagua', '0015_auto_20181031_1923'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Address',
            new_name='Address_custom',
        ),
        migrations.RemoveField(
            model_name='carrier',
            name='address_2',
        ),
        migrations.AddField(
            model_name='carrier',
            name='tutor',
            field=models.CharField(default='', max_length=100),
        ),
    ]
