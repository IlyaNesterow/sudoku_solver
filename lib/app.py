from flask import Flask, request, jsonify
from lib.sudoku import Sudoku
from lib.other import cors_handling


app = Flask(__name__)

app.after_request(cors_handling)

app.config['CORS_HEADERS'] = 'application/json'

@app.route('/solve', methods=['PUT'])
def solve():
    try:
        matrix = request.json.get('matrix', None)
        if matrix is None:
            raise ValueError('Matrix was not provided')
        if len(matrix) != 9 or type(matrix[0]) != list:
            raise ValueError('Invalid matrix')
        for row in matrix:
            if len(row) != 9:
                raise ValueError('Invalid matrix')

        Sudoku(matrix).solve()
        return jsonify({'solved': matrix}), 201
    except Exception as ex:
        return jsonify({'error': ex.args or 'occured'}), 500