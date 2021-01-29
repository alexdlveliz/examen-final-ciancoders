# Generated by Django 2.2.13 on 2021-01-29 04:14

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('creado', models.DateTimeField(auto_now_add=True)),
                ('modificado', models.DateTimeField(auto_now_add=True)),
                ('name', models.CharField(max_length=50)),
                ('description', models.TextField()),
                ('price', models.FloatField()),
                ('stock', models.PositiveIntegerField(verbose_name='Existencias del producto')),
            ],
            options={
                'ordering': ['-creado', '-modificado'],
                'get_latest_by': 'creado',
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Sale',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('creado', models.DateTimeField(auto_now_add=True)),
                ('modificado', models.DateTimeField(auto_now_add=True)),
                ('buyer', models.CharField(blank=True, max_length=50, null=True, verbose_name='Comprador')),
                ('total', models.FloatField(verbose_name='Total de la venta')),
            ],
            options={
                'ordering': ['-creado', '-modificado'],
                'get_latest_by': 'creado',
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='SaleDetail',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('creado', models.DateTimeField(auto_now_add=True)),
                ('modificado', models.DateTimeField(auto_now_add=True)),
                ('quantity', models.PositiveIntegerField(default=1, verbose_name='Cantidad de unidades del producto')),
                ('unit_total', models.FloatField(verbose_name='Total unitario')),
                ('subtotal', models.FloatField(verbose_name='Subtotal de la venta del producto')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sale_detail_product', to='api.Product')),
                ('sale', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sale_detail_sale', to='api.Sale')),
            ],
            options={
                'ordering': ['-creado', '-modificado'],
                'get_latest_by': 'creado',
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('creado', models.DateTimeField(auto_now_add=True)),
                ('modificado', models.DateTimeField(auto_now_add=True)),
                ('avatar', models.ImageField(blank=True, null=True, upload_to='Avatar')),
                ('phone', models.CharField(blank=True, max_length=15, null=True)),
                ('address', models.CharField(blank=True, max_length=250, null=True)),
                ('gender', models.PositiveSmallIntegerField(blank=True, choices=[(0, 'MALE'), (1, 'FEMALE')], null=True)),
                ('activo', models.BooleanField(default=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='profile', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-creado', '-modificado'],
                'get_latest_by': 'creado',
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='product',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Profile'),
        ),
    ]
