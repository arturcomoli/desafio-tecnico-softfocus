from django.urls import path

from .views import ListCreateLossView, RetrieveUpdateDestroyLossView

urlpatterns = [
    path("losses/", ListCreateLossView.as_view()),
    path("losses/<pk>/", RetrieveUpdateDestroyLossView.as_view()),
]
