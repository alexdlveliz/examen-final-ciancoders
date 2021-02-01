""" Sale & SaleDetail ViewSet """

# Django
from django_filters.rest_framework import DjangoFilterBackend
from django.db import transaction

# Django REST Framework
from rest_framework import status, filters, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from api.models import Product, Sale, SaleDetail
from api.serializers import (
    SaleReadSerializer,
    SaleDetailReadSerializer,
    SaleSerializer,
    SaleDetailSerializer
)


class SaleViewSet(viewsets.ModelViewSet):
    queryset = Sale.objects.all()

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("buyer",)
    search_fields = ("buyer",)
    ordering_fields = ("buyer",)

    def get_permissions(self):
        permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]
    
    def create(self, request, *args, **kwargs):
        try:
            with transaction.atomic():
                data = request.data
                total = 0.0
                for product in data:
                    existencia = Product.objects.get(pk=product.get("id")).stock >= product.get("quantity")
                    print(existencia)
                    if existencia == False:
                        return Response({"detail": "No hay suficientes produtos en inventario"}, status=status.HTTP_306_RESERVED)
                    else:
                        stock_product = Product.objects.get(pk=product.get("id"))
                        stock_product.stock = stock_product.stock - int(product.get("quantity"))
                        print(stock_product.stock)
                        stock_product.save()

                    total += float(product.get("price")) * int(product.get("quantity"))
                sale = Sale.objects.create(total=total)

                for product in data:
                    SaleDetail.objects.create(
                        quantity=product.get("quantity"),
                        unit_total=product.get("price"),
                        subtotal=float(product.get("price")*int(product.get("quantity"))),
                        sale=sale,
                        product=Product.objects.get(pk=product.get("id"))
                    )
                
                sale_serializer = SaleReadSerializer(sale)
                return Response(sale_serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"detail": str(e)})