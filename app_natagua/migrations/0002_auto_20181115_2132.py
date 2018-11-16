# Generated by Django 2.1.2 on 2018-11-15 21:32

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('app_natagua', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Alumno',
            fields=[
                ('id', models.AutoField(help_text='Id único para alumno ', primary_key=True, serialize=False)),
                ('apellido', models.CharField(db_index=True, max_length=100)),
                ('nombre', models.CharField(db_index=True, max_length=100)),
                ('dni', models.CharField(max_length=25, unique=True)),
                ('edad', models.CharField(max_length=10)),
                ('sexo', models.CharField(choices=[('M', 'MUJER'), ('H', 'HOMBRE')], db_index=True, max_length=1)),
                ('direccion', models.CharField(blank=True, max_length=200, null=True)),
                ('entre_calle', models.CharField(blank=True, max_length=200, null=True)),
                ('celular', models.CharField(blank=True, max_length=50, null=True)),
                ('telefono', models.CharField(blank=True, max_length=50, null=True)),
                ('email', models.EmailField(blank=True, max_length=100, null=True)),
                ('description', models.TextField(blank=True, max_length=1000, null=True)),
                ('fecha_nacimiento', models.DateTimeField(auto_now_add=True)),
                ('codigo_postal', models.CharField(blank=True, max_length=5, null=True)),
                ('fecha_creacion', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'verbose_name': 'name',
                'verbose_name_plural': 'Alumno',
                'ordering': ('apellido', 'nombre'),
            },
        ),
        migrations.CreateModel(
            name='Complejo',
            fields=[
                ('id', models.AutoField(help_text='Id único de Complejo ', primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=50, unique=True)),
                ('telefono', models.CharField(max_length=50, verbose_name='Telefono')),
                ('direccion', models.CharField(blank=True, max_length=200, null=True)),
                ('email', models.EmailField(blank=True, max_length=100, null=True)),
                ('description', models.TextField(blank=True, max_length=1000, null=True)),
            ],
            options={
                'verbose_name_plural': 'Complejo',
            },
        ),
        migrations.CreateModel(
            name='Grupos',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha', models.DateTimeField(auto_now_add=True)),
                ('complejo', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='app_natagua.Complejo')),
            ],
        ),
        migrations.CreateModel(
            name='GruposAlumno',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha', models.DateTimeField(auto_now_add=True)),
                ('sexo', models.CharField(choices=[('M', 'MUJER'), ('H', 'HOMBRE')], db_index=True, max_length=1)),
                ('edad_min', models.IntegerField(default=1)),
                ('edad_max', models.IntegerField(default=1)),
            ],
            options={
                'verbose_name_plural': 'Grupo',
            },
        ),
        migrations.CreateModel(
            name='Localidad',
            fields=[
                ('id', models.AutoField(help_text='Id único de Localidad ', primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=50, verbose_name='Nombre')),
                ('codigopostal', models.CharField(max_length=10, verbose_name='Código Postal')),
            ],
            options={
                'verbose_name_plural': 'Localidad',
                'ordering': ['nombre'],
            },
        ),
        migrations.CreateModel(
            name='Profesor',
            fields=[
                ('id', models.AutoField(help_text='Id único para Profesor ', primary_key=True, serialize=False)),
                ('apellido', models.CharField(db_index=True, max_length=100)),
                ('nombre', models.CharField(db_index=True, max_length=100)),
                ('dni', models.CharField(max_length=25, unique=True)),
                ('edad', models.CharField(max_length=10)),
                ('sexo', models.CharField(choices=[('M', 'MUJER'), ('H', 'HOMBRE')], db_index=True, max_length=1)),
                ('direccion', models.CharField(blank=True, max_length=200, null=True)),
                ('entre_calle', models.CharField(blank=True, max_length=200, null=True)),
                ('celular', models.CharField(blank=True, max_length=50, null=True)),
                ('telefono', models.CharField(blank=True, max_length=50, null=True)),
                ('email', models.EmailField(blank=True, max_length=100, null=True)),
                ('description', models.TextField(blank=True, max_length=1000, null=True)),
                ('fecha_nacimiento', models.DateTimeField(auto_now_add=True)),
                ('codigo_postal', models.CharField(blank=True, max_length=5, null=True)),
                ('fecha_creacion', models.DateTimeField(auto_now_add=True)),
                ('id_localidad', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='localidad_profesor', to='app_natagua.Localidad')),
            ],
            options={
                'verbose_name': 'Profesor',
                'verbose_name_plural': 'Profesores',
                'ordering': ('apellido', 'nombre'),
            },
        ),
        migrations.CreateModel(
            name='Provincia',
            fields=[
                ('id', models.AutoField(help_text='Id único de provincia ', primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=50, verbose_name='Nombre')),
            ],
            options={
                'verbose_name_plural': 'Provincia',
                'ordering': ['nombre'],
            },
        ),
        migrations.CreateModel(
            name='Transportista',
            fields=[
                ('id', models.AutoField(help_text='Id único para transportista ', primary_key=True, serialize=False)),
                ('apellido', models.CharField(db_index=True, max_length=100)),
                ('nombre', models.CharField(db_index=True, max_length=100)),
                ('dni', models.CharField(max_length=25, unique=True)),
                ('edad', models.CharField(max_length=10)),
                ('sexo', models.CharField(choices=[('M', 'MUJER'), ('H', 'HOMBRE')], db_index=True, max_length=1)),
                ('direccion', models.CharField(blank=True, max_length=200, null=True)),
                ('entre_calle', models.CharField(blank=True, max_length=200, null=True)),
                ('celular', models.CharField(blank=True, max_length=50, null=True)),
                ('telefono', models.CharField(blank=True, max_length=50, null=True)),
                ('email', models.EmailField(blank=True, max_length=100, null=True)),
                ('description', models.TextField(blank=True, max_length=1000, null=True)),
                ('fecha_nacimiento', models.DateTimeField(auto_now_add=True)),
                ('codigo_postal', models.CharField(blank=True, max_length=5, null=True)),
                ('fecha_creacion', models.DateTimeField(auto_now_add=True)),
                ('id_localidad', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='localidad', to='app_natagua.Localidad')),
                ('id_provincia', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='provincia', to='app_natagua.Provincia')),
                ('user', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'Transportista',
                'ordering': ('apellido', 'nombre'),
            },
        ),
        migrations.RenameModel(
            old_name='Turno',
            new_name='Turnos',
        ),
        migrations.AddField(
            model_name='profesor',
            name='id_provincia',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='provincia_profesor', to='app_natagua.Provincia'),
        ),
        migrations.AddField(
            model_name='profesor',
            name='user',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='localidad',
            name='id_provincia',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='provincia_localidad', to='app_natagua.Provincia'),
        ),
        migrations.AddField(
            model_name='gruposalumno',
            name='profesor',
            field=models.ManyToManyField(to='app_natagua.Profesor'),
        ),
        migrations.AddField(
            model_name='gruposalumno',
            name='turno',
            field=models.ManyToManyField(to='app_natagua.Turnos'),
        ),
        migrations.AddField(
            model_name='grupos',
            name='profesor',
            field=models.ManyToManyField(to='app_natagua.Profesor'),
        ),
        migrations.AddField(
            model_name='grupos',
            name='turno',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='provincia_alumno', to='app_natagua.Turnos'),
        ),
        migrations.AddField(
            model_name='alumno',
            name='id_localidad',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='localidad_alumno', to='app_natagua.Localidad'),
        ),
        migrations.AddField(
            model_name='alumno',
            name='id_provincia',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='provincia_alumno', to='app_natagua.Provincia'),
        ),
        migrations.AddIndex(
            model_name='transportista',
            index=models.Index(fields=['apellido', 'nombre'], name='app_natagua_apellid_78ce4e_idx'),
        ),
        migrations.AddIndex(
            model_name='transportista',
            index=models.Index(fields=['apellido', 'dni'], name='apellido_dni_idx'),
        ),
        migrations.AddIndex(
            model_name='profesor',
            index=models.Index(fields=['apellido', 'nombre'], name='prof_apellido_nombre_idx'),
        ),
        migrations.AddIndex(
            model_name='profesor',
            index=models.Index(fields=['apellido', 'dni'], name='prof_apellido_dni'),
        ),
        migrations.AlterUniqueTogether(
            name='localidad',
            unique_together={('id_provincia', 'id')},
        ),
        migrations.AddIndex(
            model_name='alumno',
            index=models.Index(fields=['apellido', 'nombre'], name='alumno_apellido_nombre_idx'),
        ),
        migrations.AddIndex(
            model_name='alumno',
            index=models.Index(fields=['apellido', 'dni'], name='alumno_apellido_dni'),
        ),
    ]