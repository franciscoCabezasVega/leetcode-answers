def lengthOfLongestSubstring(s):
    char_set = set()
    left = 0
    max_len = 0

    for right in range(len(s)):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        char_set.add(s[right])
        max_len = max(max_len, right - left + 1)

    return max_len

if __name__ == "__main__":
    s = "abcabcbb"
    print("Input:", s)
    print("Output:", lengthOfLongestSubstring(s))  # 3

    s = "bbbbb"
    print("Input:", s)
    print("Output:", lengthOfLongestSubstring(s))  # 1

    s = "pwwkew"
    print("Input:", s)
    print("Output:", lengthOfLongestSubstring(s))  # 3
