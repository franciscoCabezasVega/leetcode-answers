# 🧮 Palindrome Number

## Problem Statement

Given an integer `x`, return `true` if `x` is a **palindrome**, and `false` otherwise.

## Examples

### Example 1
```code
Input: x = 121
Output: true
Explanation: 121 reads as 121 from left to right and from right to left.
```

### Example 2
```code
Input: x = -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
```

### Example 3
```code
Input: x = 10
Output: false
Explanation: Reads 01 from right to left. Therefore it is not a palindrome.
```

**Constraints**

* `-231 <= x <= 231 - 1`

**Follow up:** Could you solve it without converting the integer to a string?

## Explanation of the Solution

Both the Python and JavaScript solutions use the same clever mathematical approach to solve the problem without converting the integer to a string. The core idea is to reverse only the second half of the number and then compare it with the first half.

### 1. Handling Edge Cases

The code first handles some edge cases where the number cannot be a palindrome:

```python
if x < 0 or (x % 10 == 0 and x != 0):
    return False
```

*   **Negative Numbers:** A negative number like `-121` can never be a palindrome because its reverse (`121-`) includes a trailing minus sign.
*   **Numbers Ending in Zero:** If a number ends in `0` (and is not `0` itself), it cannot be a palindrome. For example, `120` reversed is `021` (or `21`). The only palindrome ending in `0` is `0` itself.

### 2. Reversing the Second Half

The `while x > reverted:` loop iteratively builds the reversed number.

*   Inside the loop, we extract the last digit of `x` (`x % 10`).
*   We append this digit to our `reverted` number (`reverted = reverted * 10 + digit`).
*   We then remove the last digit from `x` by integer division (`x //= 10`).
*   This loop continues until we have processed half of the digits. We know we're in the middle when `x` is no longer greater than `reverted`.

### 3. Final Comparison

After the loop, we need to check if the first half (`x`) matches the reversed second half (`reverted`):
*   **Even Number of Digits (e.g., 1221):** The loop stops when `x` is `12` and `reverted` is `12`. The condition `x == reverted` will be `true`.
*   **Odd Number of Digits (e.g., 121):** The loop stops when `x` is `1` and `reverted` is `12`. The middle digit (`2`) is now the last digit of `reverted`. To make the comparison fair, we can discard this middle digit from `reverted` by doing `reverted // 10`. The condition `x == reverted // 10` (`1 == 1`) will be `true`.

This approach is efficient as it only iterates through half of the digits of the number and avoids potential overflow issues that could arise from reversing the entire number if it were very large.

## Solution (Python)
```python
class Solution:
    def isPalindrome(self, x: int) -> bool:
        if x < 0 or (x % 10 == 0 and x != 0):
            return False

        reverted = 0
        while x > reverted:
            digit = x % 10
            reverted = reverted * 10 + digit
            x //= 10

        return x == reverted or x == reverted // 10
```

## Solution (Javascript)
```javascript
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    if (x < 0 || (x % 10 === 0 && x !== 0)) return false;

    let reverted = 0;
    while (x > reverted) {
        const digit = x % 10;
        reverted = reverted * 10 + digit;
        x = Math.floor(x / 10);
    }

    return x === reverted || x === Math.floor(reverted / 10);
};
```
