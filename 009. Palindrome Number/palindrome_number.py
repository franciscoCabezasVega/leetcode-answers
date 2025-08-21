def isPalindrome(x: int) -> bool:
    if x < 0 or (x % 10 == 0 and x != 0):
        return False

    reverted = 0
    while x > reverted:
        digit = x % 10
        reverted = reverted * 10 + digit
        x //= 10

    return x == reverted or x == reverted // 10

if __name__ == "__main__":
    print(isPalindrome(121))   # True
    print(isPalindrome(-121))  # False
    print(isPalindrome(10))    # False
    print(isPalindrome(0))     # True
