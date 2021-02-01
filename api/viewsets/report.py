""" Reports ViewSet """

# Django
from django_filters.rest_framework import DjangoFilterBackend

# Django REST Framework
from rest_framework import status, filters, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

# Models
from api.models import Product, Profile, Sale, SaleDetail

# Serializers
from api.serializers import ProductReadSerializer


class ReportViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()

    def get_permissions(self):
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    @action(methods=['get'], detail=False)
    def global_sales(self, request):
        user = request.user
        profile = Profile.objects.get(user=user)
        sales = SaleDetail.objects.filter(product__owner=profile)
        grand_total = 0
        for sale in sales:
            grand_total += sale.subtotal
        return Response({"global_sale": grand_total}, status=status.HTTP_200_OK)
    
    @action(methods=['get'], detail=False)
    def mean_price(self, request):
        user = request.user
        profile = Profile.objects.get(user=user)
        products = Product.objects.filter(owner=profile)
        count = products.count()
        if count == 0:
            return Response({"mean_price": 0}, status=status.HTTP_200_OK)
        else:    
            prices = 0
            for product in products:
                prices += product.price
            prices = prices/count
            return Response({"mean_price": prices}, status=status.HTTP_200_OK)
    
    @action(methods=['get'], detail=False)
    def owned_products(self, request):
        user = request.user
        profile = Profile.objects.get(user=user)
        products_queryset = Product.objects.filter(owner=profile)

        serializer = ProductReadSerializer(products_queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        product = Product.objects.get(pk=pk)
        sales = SaleDetail.objects.filter(product=product)
        total = 0
        for sale in sales:
            total += sale.subtotal
        return Response({"product_total": total}, status=status.HTTP_200_OK)
        
