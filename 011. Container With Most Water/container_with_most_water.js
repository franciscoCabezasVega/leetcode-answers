function maxArea(height) {
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
}

function main() {
  console.log(maxArea([1,8,6,2,5,4,8,3,7])); // 49
  console.log(maxArea([1,1]));               // 1
}

main();
