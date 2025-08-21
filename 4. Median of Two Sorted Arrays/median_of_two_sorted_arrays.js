function findMedianSortedArrays(nums1, nums2) {
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
}

function main() {
    console.log(findMedianSortedArrays([1, 3], [2])); // 2.0
    console.log(findMedianSortedArrays([1, 2], [3, 4])); // 2.5
    console.log(findMedianSortedArrays([0, 0], [0, 0])); // 0
}

main();
