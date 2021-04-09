from flask import Response


def cors_handling(response: Response) -> Response:
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Methods',
                         'PUT, GET, DELETE, OPTIONS')
    response.headers.add('Access-Control-Allow-Headers',
                         'content-type, authorization')
    return response