from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework import status
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

@api_view(['DELETE'])
def delete_product(request, pk):
    try:
        product = Product.objects.get(id=pk)
        product.delete()
        return Response({"detail": "Product deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
    except Product.DoesNotExist:
        return Response({"detail": "Product not found."}, status=status.HTTP_404_NOT_FOUND)
@api_view(['POST'])
def add_product(request):
    if request.method == 'POST':
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # Sauvegarde le produit dans la base de données
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# Route pour mettre à jour un produit
@api_view(['PUT'])
def update_product(request, pk):
    # Récupérer le produit à mettre à jour
    product = get_object_or_404(Product, pk=pk)

    # Sérialiser les données envoyées
    serializer = ProductSerializer(product, data=request.data)

    if serializer.is_valid():
        # Si les données sont valides, on met à jour le produit
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        # Si les données ne sont pas valides, on retourne une erreur
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)