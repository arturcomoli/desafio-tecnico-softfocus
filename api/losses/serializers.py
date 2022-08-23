from rest_framework import serializers

from .models import Loss


class LocationSerializer(serializers.Serializer):
    latitude = serializers.FloatField(min_value=-90, max_value=90)
    longitude = serializers.FloatField(min_value=-180, max_value=180)


class LossSerializer(serializers.ModelSerializer):
    localizacao = LocationSerializer()

    class Meta:
        model = Loss
        fields = "__all__"
        # extra_kwargs = {"location": {"write_only": True}}


# class LossDetailsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Loss
#         fields = "__all__"
# extra_kwargs = {"location": {"write_only": True}}

# def get_latitude(self, obj):
#     return obj.location.y

# def get_longitude(self, obj):
#     return obj.location.x
