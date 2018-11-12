from .settings import URL_PREFIX, API_PREFIX
import json


def global_vars(request):
    return {
        'URL_PREFIX': URL_PREFIX,
        'API_PREFIX': API_PREFIX,
    }
