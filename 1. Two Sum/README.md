# 🧮 Two Sum

## Problem Statement

Given an array of integers `nums` and an integer `target`, return **indices of the two numbers** such that they add up to `target`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.

## Examples

### Example 1
```code
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
```

### Example 2
```code
Input: nums = [3,2,4], target = 6
Output: [1,2]
```

### Example 3
```code
Input: nums = [3,3], target = 6
Output: [0,1]
```

**Constraints**

* `2 <= nums.length <= 10^4`

* `-10^9 <= nums[i] <= 10^9`

* `-10^9 <= target <= 10^9`

**Only one valid answer exists.**

**Follow-up:** Can you come up with an algorithm that is less than O(n²) time complexity?

## Explanation of the Solution

The problem asks us to find two numbers in an array that sum up to a specific target. A brute-force approach would be to check every pair of numbers, which would have a time complexity of O(n²). We can do much better by using a **hash map** (or a dictionary in Python) to keep track of the numbers we've seen so far.

The core idea is this: as we iterate through the array, for each element `num`, we calculate its `complement` (i.e., `target - num`). This `complement` is the number we need to find in the rest of the array to form the target sum.

1.  **Initialization**:
    *   We create an empty hash map called `seen`. This map will store the numbers we have encountered as keys and their corresponding indices as values.

2.  **Single-Pass Iteration**:
    *   We iterate through the `nums` array just once, keeping track of both the value (`num`) and its index (`i`).

3.  **Finding the Complement**:
    *   For each `num`, we calculate the `complement` needed: `complement = target - num`.
    *   We then check if this `complement` already exists as a key in our `seen` map.
        *   **If it exists**: This means we have previously seen the other number that adds up to the target. We have found our pair! We can immediately return the index of the complement (which we retrieve from `seen[complement]`) and the index of the current number (`i`).
        *   **If it does not exist**: We haven't found the pair yet. We add the current number `num` and its index `i` to the `seen` map. This way, if we encounter its complement in a future iteration, we'll be able to find it.

4.  **Guaranteed Solution**:
    *   Since the problem guarantees that exactly one solution exists, we are sure to find a complement and return from within the loop. This approach has a time complexity of **O(n)** because we iterate through the array once, and hash map lookups and insertions are, on average, O(1) operations.

## Solution (Python)
```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        seen = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i
```

## Solution (Javascript)
```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    const seen = new Map();

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (seen.has(complement)) {
            return [seen.get(complement), i];
        }
        seen.set(nums[i], i);
    }
};
```