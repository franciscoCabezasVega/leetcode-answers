# 🧮 Longest Palindromic Substring

## Problem Statement

Given a string `s`, return the longest palindromic substring in `s`.

## Examples

### Example 1
```code
Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.
```

### Example 2
```code
Input: s = "cbbd"
Output: "bb"
```

**Constraints**

* `1 <= s.length <= 1000`
* `s` consist of only digits and English letters.

## Explanation of the Solution

A brute-force approach for this problem would be to generate every possible substring and check if it's a palindrome, which would be very inefficient. A much more optimized approach is the **"Expand Around Center"** method.

The core idea is that every palindrome has a center. This center can either be a single character (for odd-length palindromes like `racecar`) or a space between two identical characters (for even-length palindromes like `aabbaa`).

The algorithm works as follows:

1.  **Iterate Through the String**: We loop through the string `s`, treating each index `i` as a potential center of a palindrome.

2.  **Handle Odd and Even Length Palindromes**: For each index `i`, we need to check two scenarios:
    *   **Odd-length palindrome**: We consider the character at `s[i]` as the center. We start expanding from this point (i.e., `left = i`, `right = i`).
    *   **Even-length palindrome**: We consider the space between `s[i]` and `s[i+1]` as the center. We start expanding from these two characters (i.e., `left = i`, `right = i + 1`).

3.  **Expansion Helper Function**: A helper function, `expandAroundCenter(left, right)`, is used. This function expands the `left` and `right` pointers outwards as long as they are within the string's bounds and the characters at those positions are the same (`s[left] == s[right]`).

4.  **Track the Longest Palindrome**:
    *   We maintain a variable, `longest`, to store the longest palindromic substring found so far.
    *   After each call to `expandAroundCenter` (for both the odd and even cases), we compare the length of the newly found palindrome with the length of `longest`.
    *   If the new palindrome is longer, we update `longest`.

5.  **Final Result**: After the main loop has checked all possible centers, the `longest` variable will hold the longest palindromic substring in the entire string, which is then returned.

This approach has a time complexity of **O(n²)**, as for each of the `2n - 1` possible centers, we might expand up to the ends of the string in the worst case.

## Solution (Python)
```python
class Solution:
    def longestPalindrome(self, s: str) -> str:
        if not s:
            return ""

        def expandAroundCenter(left, right):
            while left >= 0 and right < len(s) and s[left] == s[right]:
                left -= 1
                right += 1
            return s[left+1:right]

        longest = ""

        for i in range(len(s)):
            p1 = expandAroundCenter(i, i)
            p2 = expandAroundCenter(i, i+1)
            
            if len(p1) > len(longest):
                longest = p1
            if len(p2) > len(longest):
                longest = p2

        return longest
```

## Solution (Javascript)
```javascript
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    if (!s || s.length < 1) return '';

    function expandAroundCenter(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
        left--;
        right++;
        }
        return s.substring(left + 1, right);
    }

    let longest = '';

    for (let i = 0; i < s.length; i++) {
        const p1 = expandAroundCenter(i, i);
        const p2 = expandAroundCenter(i, i + 1);

        if (p1.length > longest.length) longest = p1;
        if (p2.length > longest.length) longest = p2;
    }

    return longest;
};
```