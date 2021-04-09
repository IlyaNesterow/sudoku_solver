from typing import List


class Sudoku:
    def __init__(self, grid: List[List]):
        self.grid = grid

    def find_next_cell(self):
        for x in range(9):
            for y in range(9):
                if self.grid[x][y] == 0:
                    return x, y

        return -1, -1

    def is_valid(self, i, j, val):
        column_ok = all([val != self.grid[i][y] for y in range(9)])
        if column_ok:
            row_ok = all([val != self.grid[x][j] for x in range(9)])
            if row_ok:
                section_top_x, section_top_y = 3 * (i // 3), 3 * (j // 3)
                for x in range(section_top_x, section_top_x + 3):
                    for y in range(section_top_y, section_top_y + 3):
                        if self.grid[x][y] == val:
                            return False
                    return True
        return False

    def solve(self, i=0, j=0):
        i, j = self.find_next_cell()
        if i == -1:
            return True
        for val in range(1, 10):
            if self.is_valid(i, j, val):
                self.grid[i][j] = val
                if self.solve(i, j):
                    return True
                self.grid[i][j] = 0

        return False
