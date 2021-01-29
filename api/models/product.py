""" Product model """

# Django
from django.db import models

# Utilities
from api.models.utils import ParentModel

# Models
from api.models.profile import Profile


class Product(ParentModel):
    """ Un producto es cualquier tipo de mercancía que se
    pueda vender en el control de órdenes, cualquier persona
    puede comprar, y todos los productos tienen solo un dueño.
    El dueño no puede comprar sus propios productos.
    """

    name = models.CharField(
        null=False,
        blank=False,
        max_length=50
    )
    description = models.TextField(
        null=False,
        blank=False,
    )
    price = models.FloatField(
        null=False,
        blank=False
    )
    stock = models.PositiveIntegerField(
        'Existencias del producto',
        null=False,
        blank=False
    )

    owner = models.ForeignKey(
        Profile,
        on_delete=models.CASCADE,
        null=False,
        blank=False
    )