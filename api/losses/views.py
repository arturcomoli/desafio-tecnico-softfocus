from datetime import date, datetime

from rest_framework.generics import (
    ListAPIView,
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


class ListByCPFApiView(ListAPIView):
    queryset = Loss.objects.all()
    serializer_class = LossSerializer

    def get_queryset(self):
        url_cpf = self.request.GET.get("cpf")
        url_date = self.request.GET.get("data")

        if url_cpf is not None:
            queryset = Loss.objects.filter(cpf__iexact=url_cpf)

        if url_date is not None:
            conv_date = datetime.strptime(url_date, "%d/%m/%Y").date()
            queryset = Loss.objects.filter(data_colheita=conv_date)

        if (url_date and url_cpf) is not None:
            conv_date = datetime.strptime(url_date, "%d/%m/%Y").date()
            queryset = Loss.objects.filter(
                cpf__iexact=url_cpf, data_colheita=conv_date
            )
        return queryset
        # return super().get_queryset()
