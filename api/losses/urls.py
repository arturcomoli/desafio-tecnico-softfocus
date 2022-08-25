from django.urls import path

from .views import (
    ListCreateLossView,  # ListByCPFApiView,
    RetrieveUpdateDestroyLossView,
)

urlpatterns = [
    path("perdas/", ListCreateLossView.as_view()),
    # path("perdas/filtro/", ListByCPFApiView.as_view()),
    path("perdas/id/<pk>/", RetrieveUpdateDestroyLossView.as_view()),
]
