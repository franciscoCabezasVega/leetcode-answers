def myAtoi(s):
    INT_MIN = -2**31
    INT_MAX = 2**31 - 1

    s = s.lstrip()
    if not s:
        return 0

    sign = 1
    i = 0

    if s[i] == '-' or s[i] == '+':
        sign = -1 if s[i] == '-' else 1
        i += 1

    num = 0

    while i < len(s) and s[i].isdigit():
        num = num * 10 + int(s[i])
        i += 1

    num *= sign

    if num < INT_MIN:
        return INT_MIN
    if num > INT_MAX:
        return INT_MAX

    return num

if __name__ == "__main__":
    print(myAtoi("42"))           # 42
    print(myAtoi("   -042"))      # -42
    print(myAtoi("1337c0d3"))     # 1337
    print(myAtoi("0-1"))          # 0
    print(myAtoi("words and 987")) # 0
