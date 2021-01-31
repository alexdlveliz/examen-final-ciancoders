""" Sale & SaleDetail model """

# Django
from django.db import models

# Utilities
from api.models.utils import ParentModel

# Models
from api.models.product import Product


class Sale(ParentModel):
    """ Venta hecha
    Guarda el total de la compra.
    La fecha en la cual se hizo la venta se registra automáticamente gracias
    a ParentModel
    """
    total = models.FloatField(
        'Total de la venta',
        null=False,
        blank=False,
    )

class SaleDetail(ParentModel):
    """ Detalle de la venta
    Guarda el registro de cada producto que se vendió
    en una venta, junto con la cantidad de dicho producto
    que se vendió, el precio unitario y el subtotal.
    """

    quantity = models.PositiveIntegerField(
        'Cantidad de unidades del producto',
        default=1
    )
    unit_total = models.FloatField(
        'Total unitario',
        null=False,
        blank=False
    )
    subtotal = models.FloatField(
        'Subtotal de la venta del producto',
        null=False,
        blank=False
    )

    sale = models.ForeignKey(
        Sale,
        null=False,
        blank=False,
        on_delete=models.CASCADE,
        related_name='sale_detail_sale'
    )
    product = models.ForeignKey(
        Product,
        null=False,
        blank=False,
        on_delete=models.CASCADE,
        related_name='sale_detail_product'
    )
