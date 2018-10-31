from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.shortcuts import redirect


# Create your views here.
from django.urls import reverse
from django.views import generic

from app_natagua.models import CarrierType
from django.contrib.auth import authenticate, login, logout

from natagua import settings


'''def login(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        # Redirect to a success page.
        return redirect((settings.LOGIN_REDIRECT_URL, request.path))
    else:
        # Return an 'invalid login' error message.
        return redirect('%s?next=%s' % (settings.LOGIN_URL, request.path))'''



@login_required
def index(request):
    return render(
        request,
        'index.html',

    )


class BookListView(generic.ListView):
    model = CarrierType


