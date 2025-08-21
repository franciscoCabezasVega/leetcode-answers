class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def addTwoNumbers(l1, l2):
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

def build_linked_list(values):
    head = ListNode(values[0])
    current = head
    for val in values[1:]:
        current.next = ListNode(val)
        current = current.next
    return head

def print_linked_list(node):
    vals = []
    while node:
        vals.append(str(node.val))
        node = node.next
    print(" -> ".join(vals))

if __name__ == "__main__":
    # Example 1: [2,4,3] + [5,6,4] = [7,0,8]
    l1 = build_linked_list([2,4,3])
    l2 = build_linked_list([5,6,4])
    result = addTwoNumbers(l1, l2)

    print("Result 1:")
    print_linked_list(result)

    # Example 2: [0] + [0] = [0]
    l1 = build_linked_list([0])
    l2 = build_linked_list([0])
    result = addTwoNumbers(l1, l2)

    print("Result 2:")
    print_linked_list(result)

    # Example 3: [9,9,9,9,9,9,9] + [9,9,9,9] = [8,9,9,9,0,0,0,1]
    l1 = build_linked_list([9,9,9,9,9,9,9])
    l2 = build_linked_list([9,9,9,9])
    result = addTwoNumbers(l1, l2)

    print("Result 3:")
    print_linked_list(result)
