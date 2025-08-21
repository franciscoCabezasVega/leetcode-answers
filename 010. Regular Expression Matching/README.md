# 🧮 Regular Expression Matching

## Problem Statement

Given an input string `s` and a pattern `p`, implement regular expression matching with support for `'.'` and `'*'` where:

* `'.'` Matches any single character.​​​​
* `'*'` Matches zero or more of the preceding element.

The matching should cover the entire input string (not partial).

## Examples

### Example 1
```code
Input: s = "aa", p = "a"
Output: false
Explanation: "a" does not match the entire string "aa".
```

### Example 2
```code
Input: s = "aa", p = "a*"
Output: true
Explanation: '*' means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes "aa".
```

### Example 3
```code
Input: s = "ab", p = ".*"
Output: true
Explanation: ".*" means "zero or more (*) of any character (.)".
```

**Constraints**

* `1 <= s.length <= 20`
* `1 <= p.length <= 20`
* `s` contains only lowercase English letters.
* `p` contains only lowercase English letters, `'.'`, and `'*'`.
* It is guaranteed for each appearance of the character `'*'`, there will be a previous valid character to match.

## Explanation of the Solution

This problem is a classic candidate for dynamic programming because a match depends on the results of smaller subproblems. We use a 2D table, `dp`, to store these results.

### The DP State

`dp[i][j]` will be `true` if the first `i` characters of the string `s` can be matched by the first `j` characters of the pattern `p`, and `false` otherwise.

The table size is `(len(s) + 1) x (len(p) + 1)` to accommodate empty prefixes of both the string and the pattern.

### 1. Initialization

*   `dp[0][0] = true`: This is our base case. An empty string `s` successfully matches an empty pattern `p`.
*   **Handling `*` for an empty string `s`**: We must initialize the first row of our `dp` table. A pattern like `a*`, `x*y*`, etc., can match an empty string.
    *   The loop `for j in range(2, n + 1)` iterates through the pattern.
    *   If `p[j-1]` is `'*'`, it means the `*` and its preceding character (e.g., `a*`) can be treated as matching **zero** characters. In this scenario, the result `dp[0][j]` depends entirely on the pattern two steps back, `dp[0][j-2]`.

### 2. The DP Transitions

We iterate through the string `s` (from `i = 1` to `m`) and the pattern `p` (from `j = 1` to `n`) and fill the `dp` table based on the character `p[j-1]`:

*   **Case 1: Direct Match (`.` or a letter)**
    If `p[j-1]` is a `.` (matches any character) or is the same as `s[i-1]`, then the current characters match. The overall match `dp[i][j]` now depends on whether the prefixes *before* these characters also matched.
    ```python
    # If s="ax" and p="ay", the match at (i,j) depends on the match for s="a" and p="a"
    dp[i][j] = dp[i-1][j-1]
    ```

*   **Case 2: The `*` Character**
    This is the most complex case. If `p[j-1]` is `'*'`, it modifies the preceding character `p[j-2]`. It can mean zero or more occurrences of that character. We have two choices:

    1.  **Treat `*` as zero occurrences**: We effectively ignore the `p[j-2]*` part of the pattern (e.g., if `p` is `ab*c`, we treat it as `ac`). The result is simply the match for the pattern two characters shorter:
        ```python
        dp[i][j] = dp[i][j-2]
        ```
    2.  **Treat `*` as one or more occurrences**: This is only possible if the current string character `s[i-1]` matches the pattern character preceding the star, `p[j-2]` (or if `p[j-2]` is a `.`). If they match, it means the `*` is "consuming" the character `s[i-1]`. The result then depends on whether the same pattern (up to `j`) could match the string *without* its last character (`s` up to `i-1`). This is because the `*` allows us to stay on the same pattern character while moving to the next character in the string.
        ```python
        # If s="aa" and p="a*", the match for "aa" vs "a*" depends on the match for "a" vs "a*"
        if p[j-2] in {s[i-1], '.'}:
            dp[i][j] = dp[i][j] or dp[i-1][j]
        ```
    We combine these two possibilities using a logical `OR`.

### 3. Final Result

The final answer is stored in `dp[m][n]`, which represents whether the entire string `s` (length `m`) matches the entire pattern `p` (length `n`).

## Solution (Python)
```python
class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        m, n = len(s), len(p)
        dp = [[False] * (n + 1) for _ in range(m + 1)]
        dp[0][0] = True

        for j in range(2, n + 1):
            if p[j - 1] == '*':
                dp[0][j] = dp[0][j - 2]

        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if p[j - 1] in {s[i - 1], '.'}:
                    dp[i][j] = dp[i - 1][j - 1]
                elif p[j - 1] == '*':

                    dp[i][j] = dp[i][j - 2]

                    if p[j - 2] in {s[i - 1], '.'}:
                        dp[i][j] = dp[i][j] or dp[i - 1][j]

        return dp[m][n]
```

## Solution (Javascript)
```javascript
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
    const m = s.length, n = p.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(false));
    dp[0][0] = true;

    for (let j = 2; j <= n; j++) {
        if (p[j - 1] === "*") {
        dp[0][j] = dp[0][j - 2];
        }
    }

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
        if (p[j - 1] === s[i - 1] || p[j - 1] === ".") {
            dp[i][j] = dp[i - 1][j - 1];
        } else if (p[j - 1] === "*") {

            dp[i][j] = dp[i][j - 2];

            if (p[j - 2] === s[i - 1] || p[j - 2] === ".") {
            dp[i][j] = dp[i][j] || dp[i - 1][j];
            }
        }
        }
    }

    return dp[m][n];
};
```