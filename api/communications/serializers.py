from drf_spectacular.utils import OpenApiExample, extend_schema_serializer
from rest_framework import serializers

from .models import Communication
from .utils import warning_in_creation


@extend_schema_serializer(
    examples=[
        OpenApiExample(
            "Loss creation example",
            summary="Loss creation",
            description="Loss creation route example",
            value={
                "nome": "example",
                "email": "example@mail.com",
                "cpf": "12345678911",
                "tipo_lavoura": "feijão",
                "data_colheita": "20/08/2022",
                "causa_da_perda": "CHUVA EXCESSIVA",
                "latitude": 2.561234,
                "longitude": -32.987654,
            },
        )
    ],
)
class CommunicationSerializer(serializers.ModelSerializer):
    # data_colheita = serializers.DateField(input_formats=["%d/%m/%Y"])

    class Meta:
        model = Communication
        fields = [
            "id",
            "nome",
            "email",
            "cpf",
            "tipo_lavoura",
            "data_colheita",
            "causa_da_perda",
            "criado_em",
            "latitude",
            "longitude",
        ]

    def validate_cpf(self, value):
        if len(value) < 11:
            raise serializers.ValidationError(
                "Certifique-se de que o cpf tenha 11 caracteres."
            )
        return value

    def validate_data_colheita(self, value):

        instance = self.context["request"].data
        queryset = Communication.objects.filter(data_colheita=value)
        warning_in_creation(queryset, instance)

        return value
