# Generated by Django 2.2.13 on 2021-01-29 04:15

from django.db import migrations


def initialData(apps, schema_editor):
    User = apps.get_model('auth', 'User')
    Profile = apps.get_model('api', 'Profile')
    Product = apps.get_model('api', 'Product')
    user = User.objects.create(
        username="usuario",
        email="usuario@ejemplo.com",
        first_name="Usuario",
        last_name="Inicial",
        password="pbkdf2_sha256$150000$GuC3z3UsxZiA$iRlgdMDESZrejTrL1B39zJ27Jid3fiPsALaI6A4urhg="
    )
    profile = Profile.objects.create(
        user=user,
        phone="18928304",
        address="ciudad",
        gender=0
    )
    Product.objects.create(
        name="Consola",
        description="Consola de videojuegos",
        price=1200,
        stock=500,
        owner=profile
    )
    Product.objects.create(
        name="Televisor",
        description="Televisor nuevo",
        price=1500,
        stock=300,
        owner=profile
    )
    Product.objects.create(
        name="Lavadora",
        description="Lavadora de ropa",
        price=1200,
        stock=50,
        owner=profile
    )




class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(initialData)
    ]
