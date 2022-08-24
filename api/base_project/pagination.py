from rest_framework import pagination
from rest_framework.response import Response


class CustomPaginationClass(pagination.PageNumberPagination):
    def get_paginated_response(self, data):
        return Response(
            {
                "total_registros": self.page.paginator.count,
                "total_paginas": self.page.paginator.num_pages,
                "por_pagina": self.page_size,
                "links": {
                    "proxima": self.get_next_link(),
                    "anterior": self.get_previous_link(),
                },
                "resultados": data,
            }
        )
        # return super().get_paginated_response(data)
