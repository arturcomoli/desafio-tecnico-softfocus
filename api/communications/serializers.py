from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import (
    OpenApiExample,
    extend_schema_field,
    extend_schema_serializer,
)
from rest_framework import serializers

from .models import Communication
from .utils import warning_in_creation, warning_in_update


# @extend_schema_serializer(
#     examples=[
#         OpenApiExample(
#             "Loss creation example",
#             summary="Loss creation",
#             description="Loss creation route example",
#             value={
#                 "id": "328f4dd4-0bb0-49ee-8595-5b0110e69a29",
#                 "nome": "example",
#                 "email": "example@mail.com",
#                 "cpf": "12345678911",
#                 "tipo_lavoura": "feijão",
#                 "data_colheita": "20/08/2022",
#                 "causa_da_perda": "CHUVA EXCESSIVA",
#                 "latitude": 2.561234,
#                 "longitude": -40.987654,
#             },
#         )
#     ],
# )
class CommunicationSerializer(serializers.ModelSerializer):
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
        read_only_fields = ["id"]

    def validate_cpf(self, value):
        if len(value) < 11:
            raise serializers.ValidationError(
                "Certifique-se de que o cpf tenha 11 caracteres."
            )
        return value

    def validate_data_colheita(self, value):

        validated_data = self.context["request"].data
        queryset = Communication.objects.filter(data_colheita=value)
        if self.context["request"].method == "POST":
            warning_in_creation(queryset, validated_data)

        return value

    def validate_causa_da_perda(self, value):
        instance = self.context["request"].data
        queryset = Communication.objects.filter(causa_da_perda=value)

        if self.context["request"].method == "POST":
            warning_in_creation(queryset, instance)

        return value

    def validate(self, attrs):
        if (
            self.context["request"].method == "PATCH"
            or self.context["request"].method == "PUT"
        ):
            instance_id = self.context["request"].parser_context["kwargs"][
                "pk"
            ]
            instance = Communication.objects.get(pk=instance_id)
            warning_in_update(attrs, instance)

            return super().validate(attrs)
        return super().validate(attrs)
