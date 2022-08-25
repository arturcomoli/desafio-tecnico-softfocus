import django_filters

from .models import Loss

# from django_filters import rest_framework as filters


class LossFilter(django_filters.FilterSet):
    cpf = django_filters.CharFilter(field_name="cpf", lookup_expr="exact")
    data = django_filters.DateFilter(
        field_name="data_colheita",
        lookup_expr="exact",
        input_formats=["%d/%m/%Y"],
    )

    class Meta:
        model = Loss
        # fields = "__all__"
        exclude = ["id"]
