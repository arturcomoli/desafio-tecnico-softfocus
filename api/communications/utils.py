import geopy.distance
from django.core.validators import BaseValidator
from rest_framework import serializers

from communications.models import Communication


def warning_in_creation(queryset, validated_data):

    for item in queryset:
        coords_1 = (item.latitude, item.longitude)
        coords_2 = (
            validated_data["latitude"],
            validated_data["longitude"],
        )
        distance_between = geopy.distance.geodesic(coords_1, coords_2).km
        if (
            distance_between <= 10
            and item.causa_da_perda != validated_data["causa_da_perda"]
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
                        "tentativa_de_cadastro": validated_data[
                            "causa_da_perda"
                        ],
                        "distancia_entre_as_ocorrencias": (
                            f"{round(distance_between, 2)} km"
                        ),
                    },
                }
            )


def warning_in_update(attrs, instance: Communication):
    causa_da_perda = instance.causa_da_perda
    data_colheita = instance.data_colheita
    latitude = instance.latitude
    longitude = instance.longitude

    if "causa_da_perda" in attrs:
        causa_da_perda = attrs["causa_da_perda"]

    if "data_colheita" in attrs:
        data_colheita = attrs["data_colheita"]

    queryset = Communication.objects.filter(data_colheita=data_colheita)

    if "latitude" in attrs:
        latitude = attrs["latitude"]

    if "longitude" in attrs:
        longitude = attrs["longitude"]

    import ipdb

    ipdb.set_trace()

    for item in queryset:
        coords_1 = (item.latitude, item.longitude)
        coords_2 = (
            latitude,
            longitude,
        )
        distance_between = geopy.distance.geodesic(coords_1, coords_2).km

        if (
            distance_between <= 10
            and item.causa_da_perda != causa_da_perda
            and str(item.id) != str(instance.id)
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
                        "tentativa_de_cadastro": causa_da_perda,
                        "distancia_entre_as_ocorrencias": (
                            f"{round(distance_between, 2)} km"
                        ),
                    },
                }
            )
