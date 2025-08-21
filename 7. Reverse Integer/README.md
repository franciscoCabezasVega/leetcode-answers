# 🧮 Reverse Integer

## Problem Statement

Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing `x` causes the value to go outside the signed 32-bit integer range `[-231, 231 - 1]`, then return `0`.

**Assume the environment does not allow you to store 64-bit integers (signed or unsigned).**

## Examples

### Example 1
```code
Input: x = 123
Output: 321
```

### Example 2
```code
Input: x = -123
Output: -321
```

### Example 3
```code
Input: x = 120
Output: 21
```

**Constraints**

* `-231 <= x <= 231 - 1`

## Explanation of the Solution

Both the Python and JavaScript solutions follow a similar mathematical approach to reverse the integer. The main difference lies in how they handle potential integer overflow, which is a key constraint of the problem.

### Core Logic

1.  **Handle the Sign**: The sign of the number (`-1` for negative, `1` for positive) is determined and stored separately. The rest of the logic operates on the absolute value of the input number.
2.  **Iterative Reversal**: The code iterates through the input number `x` until it becomes `0`. In each iteration:
    *   It "pops" the last digit from `x` using the modulo operator (`digit = x % 10`).
    *   It "pushes" this digit to the `reversed_num` by first multiplying `reversed_num` by 10 and then adding the new `digit`.
    *   It removes the last digit from `x` using integer division (`x = x // 10`).
3.  **Final Result**: After the loop, the original sign is reapplied to the `reversed_num`.

### Overflow Handling

This is the most critical part of the solution. Since we cannot use 64-bit integers, we must check if the `reversed_num` is about to exceed the 32-bit integer limits (`INT_MAX` or `INT_MIN`) *before* the final multiplication and addition.

*   **Python Solution**: This implementation performs the check *before* the operation.
    *   `if reversed_num > INT_MAX // 10`: If the current reversed number is already greater than `214748364`, multiplying it by 10 will definitely cause an overflow.
    *   `if reversed_num == INT_MAX // 10 and x % 10 > 7`: If the reversed number is exactly `214748364`, the next digit cannot be larger than `7` (the last digit of `INT_MAX`, which is `2,147,483,647`).
    *   Similar logic is applied for the negative overflow check against `INT_MIN`. This approach strictly adheres to the problem's constraints.

*   **JavaScript Solution**: This implementation performs the check *after* the reversal is complete. This is possible because JavaScript uses 64-bit floating-point numbers (IEEE 754) by default, which can temporarily store values larger than a 32-bit integer. While this code is simpler, it leverages a language feature that technically bypasses the "no 64-bit integers" constraint.

## Solution (Python)
```python
class Solution:
    def reverse(self, x: int) -> int:
        INT_MIN = -2**31
        INT_MAX = 2**31 - 1

        sign = -1 if x < 0 else 1
        x = abs(x)

        reversed_num = 0
        while x != 0:
            if reversed_num > INT_MAX // 10 or (reversed_num == INT_MAX // 10 and x % 10 > 7):
                return 0
            if reversed_num < INT_MIN // 10 or (reversed_num == INT_MIN // 10 and x % 10 < -8):
                return 0

            digit = x % 10
            x //= 10
            reversed_num = reversed_num * 10 + digit

        return reversed_num * sign
```

## Solution (Javascript)
```javascript
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    const INT_MIN = -2147483648;
    const INT_MAX = 2147483647;

    let sign = x < 0 ? -1 : 1;
    x = Math.abs(x);

    let reversed = 0;
    while (x !== 0) {
        const digit = x % 10;
        x = Math.trunc(x / 10);
        reversed = reversed * 10 + digit;
    }

    reversed *= sign;

    if (reversed < INT_MIN || reversed > INT_MAX) {
        return 0;
    }
    return reversed;
};
```