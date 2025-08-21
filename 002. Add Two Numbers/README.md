# 🧮 Add Two Numbers

## Problem Statement

You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

## Examples

### Example 1
```code
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.
```

### Example 2
```code
Input: l1 = [0], l2 = [0]
Output: [0]
```

### Example 3
```code
Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]
```

**Constraints**

* The number of nodes in each linked list is in the range `[1, 100]`.
* `0 <= Node.val <= 9`
* It is guaranteed that the list represents a number that does not have leading zeros.

## Explanation of the Solution

The solution simulates the process of manual, column-by-column addition that we learn in elementary school, but adapted for linked lists.

1.  **Initialization**:
    *   We create a `dummy` head node. This is a sentinel node that simplifies the code by providing a fixed starting point for our result list. The actual result will be `dummy.next`.
    *   A `current` pointer is initialized to `dummy`. This pointer will be used to build the new linked list by adding new nodes.
    *   A `carry` variable is initialized to `0`. This will store the carry-over value when a sum is 10 or greater.

2.  **Iteration**:
    *   We loop as long as there are still nodes in `l1`, nodes in `l2`, or a `carry` value is present. This condition correctly handles cases where the lists have different lengths and ensures any final carry-over digit is added to the result.

3.  **Calculation per Node**:
    *   Inside the loop, we get the values from the current nodes of `l1` and `l2`. If one of the lists is shorter than the other, we treat the value of the non-existent node as `0`.
    *   We calculate the `sum` of the two digits plus the `carry` from the previous iteration.
    *   The new `carry` for the *next* iteration is calculated as `sum / 10` (integer division).
    *   The digit to be stored in the new node is `sum % 10` (the remainder).

4.  **Building the Result List**:
    *   A new `ListNode` is created with the calculated digit.
    *   This new node is attached to our result list via `current.next`.
    *   The `current` pointer is then advanced to this new node (`current = current.next`) to prepare for the next addition.

5.  **Advancing Pointers**:
    *   The `l1` and `l2` pointers are moved to their respective next nodes for the next iteration.

6.  **Return Value**:
    *   Once the loop finishes, the `dummy.next` node is returned, which is the head of the newly created linked list containing the sum.

## Solution (Python)
```python
class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode(0)
        current = dummy
        carry = 0

        while l1 or l2 or carry:
            val1 = l1.val if l1 else 0
            val2 = l2.val if l2 else 0

            total = val1 + val2 + carry
            carry = total // 10
            new_digit = total % 10

            current.next = ListNode(new_digit)
            current = current.next

            l1 = l1.next if l1 else None
            l2 = l2.next if l2 else None

        return dummy.next
```

## Solution (Javascript)
```javascript
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
 
  let dummy = new ListNode(0);
  let current = dummy;
  let carry = 0;

  while (l1 !== null || l2 !== null || carry !== 0) {
    const val1 = l1 ? l1.val : 0;
    const val2 = l2 ? l2.val : 0;

    const sum = val1 + val2 + carry;
    carry = Math.floor(sum / 10);
    const newDigit = sum % 10;

    current.next = new ListNode(newDigit);
    current = current.next;

    l1 = l1 ? l1.next : null;
    l2 = l2 ? l2.next : null;
  }

  return dummy.next;
};
```