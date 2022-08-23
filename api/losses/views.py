from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
)

from .models import Loss
from .serializers import LossSerializer


class ListCreateLossView(ListCreateAPIView):
    queryset = Loss.objects.all()
    serializer_class = LossSerializer


class RetrieveUpdateDestroyLossView(RetrieveUpdateDestroyAPIView):
    queryset = Loss.objects.all()
    serializer_class = LossSerializer
