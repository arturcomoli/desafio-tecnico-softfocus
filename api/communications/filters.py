import django_filters

from .models import Communication

# from django_filters import rest_framework as filters


class CommunicationFilter(django_filters.FilterSet):

    cpf = django_filters.CharFilter(field_name="cpf", lookup_expr="exact")
    nome = django_filters.CharFilter(field_name="nome", lookup_expr="iexact")
    email = django_filters.CharFilter(field_name="email", lookup_expr="iexact")
    tipo_lavoura = django_filters.CharFilter(
        field_name="tipo_lavoura", lookup_expr="iexact"
    )
    causa_da_perda = django_filters.CharFilter(
        field_name="causa_da_perda", lookup_expr="iexact"
    )

    class Meta:
        model = Communication
        # fields = "__all__"
        exclude = ["id", "criado_em"]
