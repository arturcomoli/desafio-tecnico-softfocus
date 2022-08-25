from rest_framework import pagination
from rest_framework.response import Response


class CustomPaginationClass(pagination.PageNumberPagination):
    page_query_param = "pagina"

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

    def get_paginated_response_schema(self, schema):
        return {
            "type": "object",
            "properties": {
                "total_registros": {"type": "integer", "example": 50},
                "total_paginas": {"type": "integer", "example": 5},
                "por_pagina": {"type": "integer", "example": 10},
                "links": {
                    "type": "object",
                    "properties": {
                        "proxima": {
                            "type": "string",
                            "nullable": True,
                            "format": "uri",
                            "example": f"https://endpoint-base.com/api/perdas/?{self.page_query_param}=5",
                        },
                        "anterior": {
                            "type": "string",
                            "nullable": True,
                            "format": "uri",
                            "example": f"https://endpoint-base.com/api/perdas/?{self.page_query_param}=3",
                        },
                    },
                },
                "resultados": schema,
            },
        }
        # return super().get_paginated_response_schema(schema)


# "total_registros": 46,
# 	"total_paginas": 5,
# 	"por_pagina": 10,
# 	"links": {
# 		"proxima": "http://localhost:8000/api/perdas/?latitude=0.000000&page=2",
# 		"anterior": null
# 	},
# 	"resultados":
