# 🧮 Container With Most Water

## Problem Statement

You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `ith` line are `(i, 0)` and `(i, height[i])`.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.

## Examples

### Example 1
```code
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.
```

### Example 2
```code
Input: height = [1,1]
Output: 1
```

**Constraints**

* `n == height.length`
* `2 <= n <= 105`
* `0 <= height[i] <= 104`

## Explanation of the Solution

This problem can be efficiently solved using the **Two-Pointer** technique. The core idea is to find the maximum area by iteratively considering pairs of lines and narrowing down the search space.

1.  **Initialization**:
    *   We start with two pointers, `left` at the beginning of the `height` array (index `0`) and `right` at the end (index `n-1`).
    *   A variable `max_area` is initialized to `0` to keep track of the maximum area found so far.

2.  **Iteration**:
    *   We enter a loop that continues as long as the `left` pointer is less than the `right` pointer.
    *   In each iteration, we calculate the area of the container formed by the lines at the `left` and `right` pointers.
        *   The **width** (`w`) of the container is the distance between the pointers: `right - left`.
        *   The **height** (`h`) of the container is limited by the shorter of the two lines: `min(height[left], height[right])`.
        *   The current area is `h * w`.
    *   We update `max_area` with the maximum value between the current `max_area` and the newly calculated area.

3.  **Moving the Pointers**:
    *   This is the crucial part of the algorithm. To potentially find a larger area, we need to decide which pointer to move.
    *   The area is limited by the shorter line. If we move the pointer of the *taller* line inwards, the width will decrease, and the height will be at most the same as the current shorter line. This guarantees that we won't find a larger area.
    *   Therefore, we should always move the pointer of the *shorter* line inwards. By doing this, we reduce the width, but we create an opportunity for the height to increase, which might lead to a larger overall area.
    *   So, if `height[left] < height[right]`, we increment `left`. Otherwise, we decrement `right`.

4.  **Termination**:
    *   The loop terminates when the `left` and `right` pointers meet. At this point, we have considered all possible pairs of lines that could form the container with the maximum area.
    *   The function returns the final `max_area`.

This approach is efficient because, in each step, we discard the line that is less likely to contribute to a larger area, reducing the search space by one element at a time. This results in a time complexity of O(n).

## Solution (Python)
```python
class Solution:
    def maxArea(self, height: List[int]) -> int:
        left, right = 0, len(height) - 1
        max_area = 0

        while left < right:
            h = min(height[left], height[right])
            w = right - left
            max_area = max(max_area, h * w)

            if height[left] < height[right]:
                left += 1
            else:
                right -= 1

        return max_area
```

## Solution (Javascript)
```javascript
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let left = 0, right = height.length - 1;
    let maxArea = 0;

    while (left < right) {
        const h = Math.min(height[left], height[right]);
        const w = right - left;
        maxArea = Math.max(maxArea, h * w);

        if (height[left] < height[right]) {
        left++;
        } else {
        right--;
        }
    }

    return maxArea;
};
```