from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
import json


class Pagination(PageNumberPagination):
    page_size = 10


    def get_paginated_response(self, data):

        if(str(self.page_size) == self.request.query_params['page'] ):
            return Response({
                "prev_page_url": None,
                "from": 1,
                "to": 15,
                "total": self.page.paginator.num_pages,
                "per_page": 15,
                "current_page": None,
                "last_page": 14,
                "next_page_url": None,
                'data': data,
            })
        else:
            return Response({
                "prev_page_url": self.get_previous_link(),
                "from": 1,
                "to": self.page.paginator.num_pages,
                "total": self.page.paginator.num_pages,
                "per_page": 10,
                "current_page": self.page.number,
                "last_page": 14,
                "next_page_url": self.get_next_link(),
                'data': data,
            })
