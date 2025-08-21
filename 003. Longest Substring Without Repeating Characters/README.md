# 🧮 Longest Substring Without Repeating Characters

## Problem Statement

Given a string s, find the length of the longest substring without duplicate characters.

## Examples

### Example 1
```code
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
```

### Example 2
```code
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
```

### Example 3
```code
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
```

**Constraints**

* `0 <= s.length <= 5 * 104`
* `s` consists of English letters, digits, symbols and spaces.

## Explanation of the Solution

The problem is solved using the **sliding window** technique. A sliding window is an abstract concept commonly used in array/string problems. A window is a sublist or substring that runs over the data, and its size can grow or shrink.

Here's how it's applied to this problem:

1.  **Window and Character Set**: We use two pointers, `left` and `right`, to define the current "window" (or substring). We also use a `Set` to store the unique characters within that window. A `Set` is ideal because it provides O(1) average time complexity for adding, deleting, and checking for the existence of an element.

2.  **Expanding the Window**: The `right` pointer iterates through the string from left to right, one character at a time. This action expands the window.

3.  **Handling Duplicates**: For each character `s[right]`, we check if it's already in our `Set`.
    *   If it is, we have found a duplicate character. We must shrink the window from the left side to remove the original occurrence of this character.
    *   We do this by removing `s[left]` from the `Set` and incrementing the `left` pointer. We repeat this process in a `while` loop until the duplicate character `s[right]` is no longer in the `Set`.

4.  **Updating the Window and Max Length**: Once we've ensured the current character `s[right]` is not in the `Set`, we add it. Now, the window `s[left...right]` is guaranteed to have no repeating characters. We calculate its length (`right - left + 1`) and update our `maxLen` if this new length is greater.

5.  **Termination**: The `right` pointer continues to the end of the string, and the final `maxLen` will be the length of the longest substring without repeating characters.

This approach is efficient because each character is visited at most twice (once by the `right` pointer and once by the `left` pointer), resulting in a time complexity of **O(n)**. The space complexity is **O(k)**, where k is the number of unique characters in the substring (or the size of the character set).

## Solution (Python)
```python
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        char_set = set()
        left = 0
        max_len = 0

        for right in range(len(s)):
            while s[right] in char_set:
                char_set.remove(s[left])
                left += 1
            char_set.add(s[right])
            max_len = max(max_len, right - left + 1)

        return max_len
```

## Solution (Javascript)
```javascript
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    const set = new Set();
    let left = 0;
    let maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        while (set.has(s[right])) {
        set.delete(s[left]);
        left++;
        }
        set.add(s[right]);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
};
```