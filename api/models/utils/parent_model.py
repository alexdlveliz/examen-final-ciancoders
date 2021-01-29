""" Parent Model """

# Django
from django.db import models


class ParentModel(models.Model):
    """ Parent Model
    Contiene campos comunes entre todos los modelos.
    """

    creado = models.DateTimeField(
        auto_now_add=True
    )
    modificado = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        abstract = True
        get_latest_by = 'creado'
        ordering = ['-creado', '-modificado']