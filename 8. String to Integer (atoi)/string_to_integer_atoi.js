function myAtoi(s) {
  const INT_MIN = -2147483648;
  const INT_MAX = 2147483647;

  s = s.trimStart();
  if (s.length === 0) return 0;

  let i = 0;
  let sign = 1;

  if (s[i] === '-' || s[i] === '+') {
    sign = (s[i] === '-') ? -1 : 1;
    i++;
  }

  let num = 0;
  while (i < s.length && s[i] >= '0' && s[i] <= '9') {
    num = num * 10 + (s[i].charCodeAt(0) - '0'.charCodeAt(0));
    i++;
  }

  num *= sign;

  if (num < INT_MIN) return INT_MIN;
  if (num > INT_MAX) return INT_MAX;
  return num;
}

function main() {
  console.log(myAtoi("42"));             // 42
  console.log(myAtoi("   -042"));        // -42
  console.log(myAtoi("1337c0d3"));       // 1337
  console.log(myAtoi("0-1"));            // 0
  console.log(myAtoi("words and 987")); // 0
}

main();
