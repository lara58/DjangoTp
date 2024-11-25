import django_filters
from .models import Product

class ProductFilter(django_filters.FilterSet):
    keyword = django_filters.CharFilter(field_name='name', lookup_expr='icontains')
    min_price = django_filters.NumberFilter(field_name='price', lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name='price', lookup_expr='lte')
    category = django_filters.CharFilter(field_name='category', lookup_expr='iexact')

    class Meta:
        model = Product
        fields = ['category', 'keyword', 'min_price', 'max_price']


