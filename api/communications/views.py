from django_filters import rest_framework as filters
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import OpenApiParameter, extend_schema
from rest_framework.generics import (
    ListAPIView,
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
)

from communications.filters import CommunicationFilter

from .models import Communication
from .serializers import CommunicationSerializer


# @extend_schema(
#     # parameters=[
#     #     CommunicationSerializer,
#     #     # OpenApiParameter("pk", OpenApiTypes.UUID, OpenApiParameter.PATH),
#     #     # OpenApiParameter(
#     #     #     "queryparam1", OpenApiTypes.UUID, OpenApiParameter.QUERY
#     #     # ),
#     # ],
#     responses={
#         200: CommunicationSerializer(many=True),
#         201: CommunicationSerializer(),
#     },
# )
class ListCreateLossView(ListCreateAPIView):
    queryset = Communication.objects.all()
    serializer_class = CommunicationSerializer

    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = CommunicationFilter


class RetrieveUpdateDestroyLossView(RetrieveUpdateDestroyAPIView):
    queryset = Communication.objects.all()
    serializer_class = CommunicationSerializer
