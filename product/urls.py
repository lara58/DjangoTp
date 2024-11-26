from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.get_products, name="products"),
    path('products/<int:pk>/', views.get_product, name="get_product_details"),
    path('products/<int:pk>/delete/', views.delete_product, name="delete_product"),  # Route pour la suppression
    path('products/add/', views.add_product, name="add_product"),
    # Nouvelle route pour la mise à jour d'un produit
    path('products/<str:pk>/update/', views.update_product, name="update_product"),
]
