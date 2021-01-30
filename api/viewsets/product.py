""" Product ViewSet """

# Django
from django_filters.rest_framework import DjangoFilterBackend

# Django REST Framework
from rest_framework import status, filters, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from api.models import Product, Profile
from api.serializers import ProductSerializer, ProductReadSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("name", "price")
    search_fields = ("name", "price")
    ordering_fields = ("name", "price")

    def get_serializer_class(self):
        """ Serializers para la API """
        if self.action == 'create':
            return ProductSerializer
        else:
            return ProductReadSerializer
    
    def get_permissions(self):
        """ Permisos para el recurso """
        if self.action == 'create':
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]
    
    def create(self, request, *args, **kwargs):
        try:
            data = request.data
            user = request.user
            owner = Profile.objects.get(user=user)
            
            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)

            product = Product.objects.create(
                name=data.get("name"),
                description=data.get("description"),
                price=data.get("price"),
                stock=data.get("stock"),
                owner=owner
            )

            serializer = ProductReadSerializer(product)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
        page = request.query_params.get('page')
        queryset = Product.objects.filter(stock__gt=0)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer_class()
            products = serializer(page, many=True)
            return self.get_paginated_response(products.data)

        serializer = self.get_serializer_class()
        products = serializer(queryset, many=True)
        return Response(products.data)

    def retrieve(self, request, pk=None):
        try:
            queryset = Product.objects.get(pk=pk)
            serializer = self.get_serializer_class()
            product = serializer(queryset)
            return Response(product.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail": str(e)})
    
    @action(methods=["get"], detail=False)
    def raw(self, request):
        try:
            queryset = Product.objects.filter(stock__gt=0)
            serializer = self.get_serializer_class()
            products = serializer(queryset, many=True)
            return Response(products.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)