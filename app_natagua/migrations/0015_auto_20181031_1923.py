# Generated by Django 2.1.2 on 2018-10-31 19:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app_natagua', '0014_auto_20181031_1723'),
    ]

    operations = [
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.AutoField(help_text='Id único para dirección ', primary_key=True, serialize=False)),
                ('raw', models.CharField(max_length=100)),
                ('street_number', models.CharField(max_length=10)),
                ('route', models.CharField(max_length=100)),
                ('postal_code', models.CharField(max_length=10)),
                ('state', models.CharField(help_text='Estado provincia ', max_length=100)),
                ('state_code', models.CharField(help_text='Código del Estado Ejemplo Ar ', max_length=100)),
                ('country', models.CharField(help_text='Pais ', max_length=100)),
                ('country_code', models.CharField(help_text='Cod. Pais ', max_length=100)),
            ],
            options={
                'verbose_name_plural': 'Dirección',
            },
        ),
        migrations.AddField(
            model_name='carrier',
            name='address_2',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='app_natagua.Address'),
        ),
    ]
