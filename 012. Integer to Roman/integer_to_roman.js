function intToRoman(num) {
  const val = [
    1000, 900, 500, 400,
    100, 90, 50, 40,
    10, 9, 5, 4, 1
  ];
  const syms = [
    "M", "CM", "D", "CD",
    "C", "XC", "L", "XL",
    "X", "IX", "V", "IV", "I"
  ];

  let roman = "";
  for (let i = 0; i < val.length; i++) {
    while (num >= val[i]) {
      num -= val[i];
      roman += syms[i];
    }
  }
  return roman;
}

function main() {
  console.log(intToRoman(3749)); // "MMMDCCXLIX"
  console.log(intToRoman(58));   // "LVIII"
  console.log(intToRoman(1994)); // "MCMXCIV"
}

main();
