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
        if self.action == 'list' or self.action == 'retrieve':
            return ProductReadSerializer
        else:
            return ProductSerializer
    
    def get_permissions(self):
        """ Permisos para el recurso """
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
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
