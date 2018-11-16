from rest_framework import serializers, generics
from api.utils import Pagination
from api.grupos.serializers import GruposPagSerializer
from app_natagua.models import Grupos


class GruposList(generics.ListAPIView):
    queryset = snippets = Grupos.objects.get_queryset().order_by('id')
    serializer_class = GruposPagSerializer
    print(queryset.values())
    pagination_class = Pagination

