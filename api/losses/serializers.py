from rest_framework import serializers

from .models import Loss
from .utils import warning_in_creation


class LossSerializer(serializers.ModelSerializer):
    # data_colheita = serializers.DateField(input_formats=["%d/%m/%Y"])

    class Meta:
        model = Loss
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
        queryset = Loss.objects.filter(data_colheita=value)
        warning_in_creation(queryset, instance)

        return value
