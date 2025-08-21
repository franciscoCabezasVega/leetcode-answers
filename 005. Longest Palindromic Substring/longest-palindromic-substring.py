def longestPalindrome(s):
    if not s:
        return ""

    def expandAroundCenter(left, right):
        while left >= 0 and right < len(s) and s[left] == s[right]:
            left -= 1
            right += 1
        return s[left+1:right]

    longest = ""

    for i in range(len(s)):
        p1 = expandAroundCenter(i, i)
        p2 = expandAroundCenter(i, i+1)
        
        if len(p1) > len(longest):
            longest = p1
        if len(p2) > len(longest):
            longest = p2

    return longest

if __name__ == "__main__":
    print(longestPalindrome("babad"))  # "bab" o "aba"
    print(longestPalindrome("cbbd"))   # "bb"
    print(longestPalindrome("a"))      # "a"
    print(longestPalindrome("ac"))     # "a" o "c"
