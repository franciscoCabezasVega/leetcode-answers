# 🧮 Zigzag Conversion

## Problem Statement

The string `"PAYPALISHIRING"` is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

```
P   A   H   N
A P L S I I G
Y   I   R
```

And then read line by line: "PAHNAPLSIIGYIR"

Write the code that will take a string and make this conversion given a number of rows:

```code
string convert(string s, int numRows);
```

## Examples

### Example 1
```code
Input: s = "PAYPALISHIRING", numRows = 3
Output: "PAHNAPLSIIGYIR"
```

### Example 2
```code
Input: s = "PAYPALISHIRING", numRows = 4
Output: "PINALSIGYAHRPI"
Explanation:
P     I    N
A   L S  I G
Y A   H R
P     I
```

### Example 3
```code
Input: s = "A", numRows = 1
Output: "A"
```

**Constraints**

* `1 <= s.length <= 1000`
* `s` consists of English letters (lower-case and upper-case), `','` and `'.'`.
* `1 <= numRows <= 1000`

## Explanation of the Solution

The most intuitive approach to this problem is to **simulate the process** of writing the characters in a zigzag pattern. We can determine which row each character belongs to and then build the final string by concatenating the rows.

The algorithm works as follows:

1.  **Handle Edge Cases**: First, we handle the trivial cases. If `numRows` is 1 or if it's greater than or equal to the length of the string, the zigzag pattern is just the original string itself. In these cases, we can return the string `s` immediately.

2.  **Row Initialization**: We create an array of empty strings (let's call it `rows`), where the size of the array is `numRows`. Each string in this array will hold the characters for one row of the zigzag pattern.

3.  **Simulation Loop**: We iterate through each character of the input string `s`. We need two variables to keep track of our position:
    *   `curr_row`: The index of the current row we are writing to.
    *   `direction`: A value (e.g., `1` for down, `-1` for up) that indicates whether we are moving down or up the rows.

4.  **Character Placement and Direction Change**:
    *   Inside the loop, we append the current character to the string at `rows[curr_row]`.
    *   The crucial part is changing the direction. The direction of movement reverses only when we reach the top row (`curr_row == 0`) or the bottom row (`curr_row == numRows - 1`).
    *   After placing the character, we update `curr_row` by adding the `direction` to it.

5.  **Final Result**: Once we have placed all the characters into their respective rows, we simply join (concatenate) all the strings in the `rows` array to get the final output string.

This method is efficient, with a time complexity of **O(n)**, where n is the length of the string, as we only iterate through the string once.

## Explanation of the Solution

The most intuitive approach to this problem is to **simulate the process** of writing the characters in a zigzag pattern. We can determine which row each character belongs to and then build the final string by concatenating the rows.

The algorithm works as follows:

1.  **Handle Edge Cases**: First, we handle the trivial cases. If `numRows` is 1 or if it's greater than or equal to the length of the string, the zigzag pattern is just the original string itself. In these cases, we can return the string `s` immediately.

2.  **Row Initialization**: We create an array of empty strings (let's call it `rows`), where the size of the array is `numRows`. Each string in this array will hold the characters for one row of the zigzag pattern.

3.  **Simulation Loop**: We iterate through each character of the input string `s`. We need two variables to keep track of our position:
    *   `curr_row`: The index of the current row we are writing to.
    *   `direction`: A value (e.g., `1` for down, `-1` for up) that indicates whether we are moving down or up the rows.

4.  **Character Placement and Direction Change**:
    *   Inside the loop, we append the current character to the string at `rows[curr_row]`.
    *   The crucial part is changing the direction. The direction of movement reverses only when we reach the top row (`curr_row == 0`) or the bottom row (`curr_row == numRows - 1`).
    *   After placing the character, we update `curr_row` by adding the `direction` to it.

5.  **Final Result**: Once we have placed all the characters into their respective rows, we simply join (concatenate) all the strings in the `rows` array to get the final output string.

This method is efficient, with a time complexity of **O(n)**, where n is the length of the string, as we only iterate through the string once.

## Solution (Python)
```python
class Solution:
    def convert(self, s: str, numRows: int) -> str:
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
```

## Solution (Javascript)
```javascript
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
    if (numRows === 1 || numRows >= s.length) {
        return s;
    }

    const rows = new Array(numRows).fill("");
    let currRow = 0;
    let direction = -1;

    for (const char of s) {
        rows[currRow] += char;
        if (currRow === 0 || currRow === numRows - 1) {
        direction *= -1;
        }
        currRow += direction;
    }

    return rows.join("");
};
```