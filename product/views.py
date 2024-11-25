from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from .filters import ProductFilter
from .serializers import ProductSerializer
from .models import Product

# Liste des produits avec filtres et pagination
@api_view(['GET'])
def get_products(request):
    # Appliquer le filtre
    filterset = ProductFilter(request.GET, queryset=Product.objects.all().order_by('id'))

    # Pagination
    paginator = PageNumberPagination()
    paginator.page_size = 5  # Nombre de résultats par page
    paginated_queryset = paginator.paginate_queryset(filterset.qs, request)

    # Sérialisation
    serializer = ProductSerializer(paginated_queryset, many=True)

    return Response({
        "products": serializer.data,
        "count": filterset.qs.count(),  # Total des produits après filtrage
        "pagination": {
            "next": paginator.get_next_link(),
            "previous": paginator.get_previous_link()
        }
    })

# Détails d'un produit spécifique
@api_view(['GET'])
def get_product(request, pk):
    product = get_object_or_404(Product, id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response({"product": serializer.data})
