class ListNode {
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}

function addTwoNumbers(l1, l2) {
    const dummy = new ListNode(0);
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
}

function buildLinkedList(arr) {
    const head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}

function printLinkedList(node) {
    const values = [];
    while (node !== null) {
        values.push(node.val);
        node = node.next;
    }
    console.log(values.join(" -> "));
}

function main() {

    // Example 1: [2, 4, 3] + [5, 6, 4] =[7, 0, 8]
    const l1A = buildLinkedList([2, 4, 3])
    const l2A = buildLinkedList([5, 6, 4])
    const resultA = addTwoNumbers(l1A, l2A)

    console.log("Result 1:")
    printLinkedList(resultA)

    // Example 2: [0] + [0] =[0]
    const l1B = buildLinkedList([0])
    const l2B = buildLinkedList([0])
    const resultB = addTwoNumbers(l1B, l2B)

    console.log("Result 2:")
    printLinkedList(resultB)

    // Example 3: [9, 9, 9, 9, 9, 9, 9] + [9, 9, 9, 9] =[8, 9, 9, 9, 0, 0, 0, 1]
    const l1C = buildLinkedList([9, 9, 9, 9, 9, 9, 9])
    const l2C = buildLinkedList([9, 9, 9, 9])
    const resultC = addTwoNumbers(l1C, l2C)

    console.log("Result 3:")
    printLinkedList(resultC)

}

main();
