def convert(s, numRows):
    if numRows == 1 or numRows >= len(s):
        return s

    rows = ["" for _ in range(numRows)]
    curr_row = 0
    direction = -1

    for char in s:
        rows[curr_row] += char

        if curr_row == 0 or curr_row == numRows - 1:
            direction *= -1
        curr_row += direction

    return "".join(rows)

if __name__ == "__main__":
    print(convert("PAYPALISHIRING", 3))  # "PAHNAPLSIIGYIR"
    print(convert("PAYPALISHIRING", 4))  # "PINALSIGYAHRPI"
    print(convert("A", 1))               # "A"
