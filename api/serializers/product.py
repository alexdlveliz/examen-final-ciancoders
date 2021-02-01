""" Product serializer """

# Django REST Framework
from rest_framework import serializers

# Models
from api.models import Product


class ProductReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
        depth = 1


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = (
            'name',
            'description',
            'price',
            'stock'
        )
