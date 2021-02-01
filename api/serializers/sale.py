""" Sale & SaleDetail serializer """

# Django REST Framework
from rest_framework import serializers

# Models
from api.models import Sale, SaleDetail


class SaleReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sale
        fields = '__all__'


class SaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sale
        fields = (
            'total',
        )


class SaleDetailReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = SaleDetail
        fields = '__all__'


class SaleDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = SaleDetail
        fields = (
            'quantity',
            'unit_total',
            'subtotal'
        )