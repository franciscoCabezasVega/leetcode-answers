function reverseInteger(x) {
  const INT_MIN = -2147483648;
  const INT_MAX = 2147483647;

  let sign = x < 0 ? -1 : 1;
  x = Math.abs(x);

  let reversed = 0;
  while (x !== 0) {
    const digit = x % 10;
    x = Math.trunc(x / 10);
    reversed = reversed * 10 + digit;
  }

  reversed *= sign;

  if (reversed < INT_MIN || reversed > INT_MAX) {
    return 0;
  }
  return reversed;
}

function main() {
  console.log(reverseInteger(123));   // 321
  console.log(reverseInteger(-123));  // -321
  console.log(reverseInteger(120));   // 21
  console.log(reverseInteger(1534236469)); // 0 (overflow)
}

main();
