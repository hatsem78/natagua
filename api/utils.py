from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
import json


class Pagination(PageNumberPagination):
    page_size = 20


    def get_paginated_response(self, data):

        if(int(self.request.query_params['page']) <= int(self.page_size) ):
            return Response({
                "prev_page_url": self.get_previous_link(),
                "from": self.page.paginator.page_range.start,
                "to": self.page.paginator.num_pages,
                "total": self.page.paginator.num_pages,
                "per_page": self.request.query_params['per_page'],
                "current_page": self.page.number,
                "last_page": (self.page.paginator.page_range.stop-1),
                "next_page_url": self.get_next_link(),
                'data': data,
            })
        else:
            return Response({
                "prev_page_url": self.get_previous_link(),
                "from": 1,
                "to": self.page.paginator.num_pages,
                "total": self.page.paginator.num_pages,
                "per_page": self.request.query_params['per_page'],
                "current_page": self.page.number,
                "last_page": 14,
                "next_page_url": self.get_next_link(),
                'data': data,
            })
