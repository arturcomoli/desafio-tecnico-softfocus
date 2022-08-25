from django_filters import rest_framework as filters
from rest_framework.generics import (
    ListAPIView,
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
)

from communications.filters import CommunicationFilter

from .models import Communication
from .serializers import CommunicationSerializer


class ListCreateLossView(ListCreateAPIView):
    queryset = Communication.objects.all()
    serializer_class = CommunicationSerializer

    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = CommunicationFilter


class RetrieveUpdateDestroyLossView(RetrieveUpdateDestroyAPIView):
    queryset = Communication.objects.all()
    serializer_class = CommunicationSerializer
