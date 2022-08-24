from django.urls import path

from .views import (
    ListByCPFApiView,
    ListCreateLossView,
    RetrieveUpdateDestroyLossView,
)

urlpatterns = [
    path("perdas/", ListCreateLossView.as_view()),
    path("perdas/filtro/", ListByCPFApiView.as_view()),
    path("perdas/<pk>/", RetrieveUpdateDestroyLossView.as_view()),
]
