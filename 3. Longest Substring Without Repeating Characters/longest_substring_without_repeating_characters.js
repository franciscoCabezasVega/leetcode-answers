function lengthOfLongestSubstring(s) {
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
}

function main() {
  console.log(lengthOfLongestSubstring("abcabcbb")); // 3
  console.log(lengthOfLongestSubstring("bbbbb"));    // 1
  console.log(lengthOfLongestSubstring("pwwkew"));   // 3
}

main();
