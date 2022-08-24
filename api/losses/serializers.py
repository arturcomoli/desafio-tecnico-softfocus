from datetime import date, datetime

import geopy.distance
from rest_framework import serializers

from .models import Loss


class LocationSerializer(serializers.Serializer):
    latitude = serializers.FloatField(min_value=-90, max_value=90)
    longitude = serializers.FloatField(min_value=-180, max_value=180)


class LossSerializer(serializers.ModelSerializer):
    localizacao = LocationSerializer()

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
            "localizacao",
        ]

    def validate_cpf(self, value):
        if len(value) < 11:
            raise serializers.ValidationError(
                "Certifique-se de que o cpf tenha 11 caracteres."
            )
        return value

    def validate(self, attrs):
        today = attrs["data_colheita"]
        queryset = Loss.objects.filter(data_colheita=today)

        for item in queryset:
            coords_1 = (
                item.localizacao["latitude"],
                item.localizacao["longitude"],
            )

            coords_2 = (
                attrs["localizacao"]["latitude"],
                attrs["localizacao"]["longitude"],
            )

            distance_between = geopy.distance.geodesic(coords_1, coords_2).km
            if (
                distance_between <= 10
                and item.causa_da_perda != attrs["causa_da_perda"]
            ):
                raise serializers.ValidationError(
                    {
                        "erro": {
                            "mensagem": (
                                "A comunicação na latitute"
                                f" {item.localizacao['latitude']} e longitude"
                                f" {item.localizacao['latitude']} reportou uma"
                                " causa diferente da informada nesse cadastro"
                            ),
                            "divergencia": {
                                "id da informacao conflitante": item.id,
                                "causa existente": item.causa_da_perda,
                                "tentativa de cadastro": attrs[
                                    "causa_da_perda"
                                ],
                                "distancia entre as ocorrencias": (
                                    f"{round(distance_between, 2)} km"
                                ),
                            },
                        }
                    }
                )

        return attrs

        return super().validate(attrs)
