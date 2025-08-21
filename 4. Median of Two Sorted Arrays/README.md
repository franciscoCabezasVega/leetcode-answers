# 🧮 Median of Two Sorted Arrays

## Problem Statement

Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return the median of the two sorted arrays.

The overall run time complexity should be `O(log (m+n))`.

## Examples

### Example 1
```code
Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.
```

### Example 2
```code
Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
```

**Constraints**

* `nums1.length == m`
* `nums2.length == n`
* `0 <= m <= 1000`
* `0 <= n <= 1000`
* `1 <= m + n <= 2000`
* `-106 <= nums1[i], nums2[i] <= 106`

## Explanation of the Solution

The goal is to find the median of two sorted arrays in `O(log(m+n))` runtime. This suggests that we cannot simply merge the two arrays and find the median (which would be `O(m+n)`), but must use a more efficient approach, like binary search.

The main idea is to partition both arrays into two halves: a "left part" and a "right part". If we can satisfy two conditions, we will have found the median:

1.  The total length of the "left part" is equal to the total length of the "right part" (or differs by one if the total number of elements is odd).
2.  The largest element of the "left part" is less than or equal to the smallest element of the "right part".

### Algorithm

1.  **Optimization**: To ensure a complexity of `O(log(min(m,n)))`, we always perform the binary search on the smaller array. If `nums1` is larger than `nums2`, we swap them.

2.  **Binary Search**:
    *   Initialize `left` and `right` pointers for the binary search on the smaller array (`nums1`). The search space ranges from `0` to `m` (the length of `nums1`).
    *   Calculate `half`, which is the number of elements that must be in the combined left part: `half = Math.floor((m + n) / 2)`.

3.  **Partitioning**:
    *   In each iteration of the loop, we choose a partition `i` in `nums1` (the midpoint of the `[left, right]` range).
    *   The partition `j` in `nums2` is automatically determined to meet the length condition: `j = half - i`.

4.  **Partition Verification**:
    *   Identify the four key elements at the edges of the partitions:
        *   `left1`: The rightmost element of the left partition of `nums1` (`nums1[i-1]`).
        *   `right1`: The leftmost element of the right partition of `nums1` (`nums1[i]`).
        *   `left2`: The rightmost element of the left partition of `nums2` (`nums2[j-1]`).
        *   `right2`: The leftmost element of the right partition of `nums2` (`nums2[j]`).
    *   To handle edge cases (when `i` or `j` is `0` or the length of the array), we use `-Infinity` and `Infinity` as sentinel values.
    *   The partition is correct if `left1 <= right2` and `left2 <= right1`. This ensures that all elements on the left are less than or equal to those on the right.

5.  **Median Calculation**:
    *   If the partition is correct, we calculate the median:
        *   **Even total elements**: The median is the average of the two middle elements: `(Math.max(left1, left2) + Math.min(right1, right2)) / 2`.
        *   **Odd total elements**: The median is the single middle element, which is the smallest of the right part: `min(right1, right2)`.
    *   If the partition is not correct, we adjust the binary search range:
        *   If `left1 > right2`, it means the partition `i` is too large, so we move the `right` pointer to `i - 1`.
        *   Otherwise, `i` is too small, and we move `left` to `i + 1`.

This process is repeated until the correct partition is found and the median is returned.

## Solution (Python)
```python
class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        if len(nums1) > len(nums2):
            nums1, nums2 = nums2, nums1

        m, n = len(nums1), len(nums2)
        total = m + n
        half = total // 2

        left, right = 0, m

        while True:
            i = (left + right) // 2
            j = half - i

            left_nums1  = nums1[i - 1] if i > 0 else float("-inf")
            right_nums1 = nums1[i]     if i < m else float("inf")
            left_nums2  = nums2[j - 1] if j > 0 else float("-inf")
            right_nums2 = nums2[j]     if j < n else float("inf")

            if left_nums1 <= right_nums2 and left_nums2 <= right_nums1:
                if total % 2 == 0:
                    return (max(left_nums1, left_nums2) + min(right_nums1, right_nums2)) / 2
                else:
                    return min(right_nums1, right_nums2)
            elif left_nums1 > right_nums2:
                right = i - 1
            else:
                left = i + 1
        
```

## Solution (Javascript)
```javascript
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1];
    }

    const m = nums1.length;
    const n = nums2.length;
    const total = m + n;
    const half = Math.floor(total / 2);

    let left = 0;
    let right = m;

    while (true) {
        let i = Math.floor((left + right) / 2);
        let j = half - i;

        const left1 = i > 0 ? nums1[i - 1] : -Infinity;
        const right1 = i < m ? nums1[i] : Infinity;
        const left2 = j > 0 ? nums2[j - 1] : -Infinity;
        const right2 = j < n ? nums2[j] : Infinity;

        if (left1 <= right2 && left2 <= right1) {
        if (total % 2 === 0) {
            return (
            (Math.max(left1, left2) + Math.min(right1, right2)) / 2
            );
        } else {
            return Math.min(right1, right2);
        }
        } else if (left1 > right2) {
        right = i - 1;
        } else {
        left = i + 1;
        }
    }
};
```