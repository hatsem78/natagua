from django.shortcuts import render

# Create your views here.
from django.views import generic

from app_natagua.models import CarrierType


def index(request):
    return render(
        request,
        'index.html',

    )


class BookListView(generic.ListView):
    model = CarrierType