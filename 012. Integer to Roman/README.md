# 🧮 Integer to Roman

## Problem Statement

Seven different symbols represent Roman numerals with the following values:

| Symbol | Value |
|--------|-------|
| I      | 1     |
| V      | 5     |
| X      | 10    |
| L      | 50    |
| C      | 100   |
| D      | 500   |
| M      | 1000  |

Roman numerals are formed by appending the conversions of decimal place values from highest to lowest. Converting a decimal place value into a Roman numeral has the following rules:

* If the value does not start with 4 or 9, select the symbol of the maximal value that can be subtracted from the input, append that symbol to the result, subtract its value, and convert the remainder to a Roman numeral.

* If the value starts with 4 or 9 use the subtractive form representing one symbol subtracted from the following symbol, for example, 4 is 1 (`I`) less than 5 (`V`): `IV` and 9 is 1 (`I`) less than 10 (`X`): `IX`. Only the following subtractive forms are used: 4 (`IV`), 9 (`IX`), 40 (`XL`), 90 (`XC`), 400 (`CD`) and 900 (`CM`).

* Only powers of 10 (`I`, `X`, `C`, `M`) can be appended consecutively at most 3 times to represent multiples of 10. You cannot append 5 (`V`), 50 (`L`), or 500 (`D`) multiple times. If you need to append a symbol 4 times use the **subtractive form**.

Given an integer, convert it to a Roman numeral.

## Examples

### Example 1
```code
Input: num = 3749

Output: "MMMDCCXLIX"

Explanation:

3000 = MMM as 1000 (M) + 1000 (M) + 1000 (M)
 700 = DCC as 500 (D) + 100 (C) + 100 (C)
  40 = XL as 10 (X) less of 50 (L)
   9 = IX as 1 (I) less of 10 (X)
Note: 49 is not 1 (I) less of 50 (L) because the conversion is based on decimal places
```

### Example 2
```code
Input: num = 58

Output: "LVIII"

Explanation:

50 = L
 8 = VIII
```

### Example 3
```code
Input: num = 1994

Output: "MCMXCIV"

Explanation:

1000 = M
 900 = CM
  90 = XC
   4 = IV
```

**Constraints**

* `1 <= num <= 3999`

## Explanation of the Solution

The provided solution employs a **greedy algorithm** to convert an integer to its Roman numeral representation. This approach works by iteratively finding the largest possible Roman numeral value that can be subtracted from the current number and appending its symbol to the result.

1.  **Data Structures**: Two arrays are defined:
    *   `val`: An array of integer values representing the Roman numerals, including the special subtractive cases (like 900, 400, 90, 40, 9, 4).
    *   `syms`: A corresponding array of Roman numeral symbols (`"M"`, `"CM"`, `"D"`, `"CD"`, etc.).

2.  **Greedy Approach**: The key to this solution is that both arrays are ordered from the largest value to the smallest. The algorithm iterates through these arrays from the beginning:
    *   For each value in `val` (e.g., starting with 1000), it checks how many times this value can be subtracted from the input number `num`.
    *   A `while` loop is used for this. As long as `num` is greater than or equal to the current value (`val[i]`), the value is subtracted from `num`, and the corresponding symbol (`syms[i]`) is appended to the result string.
    *   Once `num` is smaller than the current value, the loop for that value terminates, and the algorithm moves to the next smaller value/symbol pair.

3.  **Termination**: This process continues until the input number `num` is reduced to 0. The final concatenated string is the correct Roman numeral.

For example, with `num = 58`:
- Start with `1000`. `58 < 1000`. Move on.
- ...
- Get to `50`. `58 >= 50`. Append "L", `num` becomes `8`. `8 < 50`, so the inner loop stops.
- Get to `10`. `8 < 10`. Move on.
- Get to `5`. `8 >= 5`. Append "V", `num` becomes `3`. `3 < 5`, so the inner loop stops.
- Get to `1`. `3 >= 1`. Append "I", `num` becomes `2`.
- `2 >= 1`. Append "I", `num` becomes `1`.
- `1 >= 1`. Append "I", `num` becomes `0`.
- The loop finishes. The result is "L" + "V" + "I" + "I" + "I" = "LVIII".

This method is efficient because it processes the number from its largest components to its smallest, correctly handling all cases, including the subtractive ones, due to their inclusion in the `val` and `syms` arrays.

## Solution (Python)
```python
class Solution:
    def intToRoman(self, num: int) -> str:
        val = [
            1000, 900, 500, 400,
            100, 90, 50, 40,
            10, 9, 5, 4, 1
        ]
        syms = [
            "M", "CM", "D", "CD",
            "C", "XC", "L", "XL",
            "X", "IX", "V", "IV", "I"
        ]
        
        roman = []
        for i in range(len(val)):
            while num >= val[i]:
                num -= val[i]
                roman.append(syms[i])
        return "".join(roman)
```

## Solution (Javascript)
```javascript
/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function(num) {
    const val = [
        1000, 900, 500, 400,
        100, 90, 50, 40,
        10, 9, 5, 4, 1
    ];
    const syms = [
        "M", "CM", "D", "CD",
        "C", "XC", "L", "XL",
        "X", "IX", "V", "IV", "I"
    ];

    let roman = "";
    for (let i = 0; i < val.length; i++) {
        while (num >= val[i]) {
        num -= val[i];
        roman += syms[i];
        }
    }
    return roman;
};
```