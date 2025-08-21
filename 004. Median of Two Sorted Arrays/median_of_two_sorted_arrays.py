def findMedianSortedArrays(nums1, nums2):
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

if __name__ == "__main__":
    nums1 = [1, 3]
    nums2 = [2]
    print(findMedianSortedArrays(nums1, nums2))  # 2.0

    nums1 = [1, 2]
    nums2 = [3, 4]
    print(findMedianSortedArrays(nums1, nums2))  # 2.5

    nums1 = [0, 0]
    nums2 = [0, 0]
    print(findMedianSortedArrays(nums1, nums2))  # 0
