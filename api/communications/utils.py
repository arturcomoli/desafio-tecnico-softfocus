import geopy.distance
from django.core.validators import BaseValidator
from rest_framework import serializers


def warning_in_creation(queryset, instance):
    for item in queryset:
        coords_1 = (item.latitude, item.longitude)
        coords_2 = (
            instance["latitude"],
            instance["longitude"],
        )
        distance_between = geopy.distance.geodesic(coords_1, coords_2).km
        if (
            distance_between <= 10
            and item.causa_da_perda != instance["causa_da_perda"]
        ):
            raise serializers.ValidationError(
                {
                    "mensagem": (
                        "A comunicação na latitute"
                        f" {item.latitude} e"
                        " longitude"
                        f" {item.longitude} reportou"
                        " uma causa diferente da informada nesse"
                        " cadastro"
                    ),
                    "divergencia": {
                        "id_da_informacao_conflitante": item.id,
                        "causa_existente": item.causa_da_perda,
                        "tentativa_de_cadastro": instance["causa_da_perda"],
                        "distancia_entre_as_ocorrencias": (
                            f"{round(distance_between, 2)} km"
                        ),
                    },
                }
            )
