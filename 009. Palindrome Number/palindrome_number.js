function isPalindrome(x) {
    if (x < 0 || (x % 10 === 0 && x !== 0)) return false;

    let reverted = 0;
    while (x > reverted) {
        const digit = x % 10;
        reverted = reverted * 10 + digit;
        x = Math.floor(x / 10);
    }

    return x === reverted || x === Math.floor(reverted / 10);
}

function main() {
    console.log(isPalindrome(121));   // true
    console.log(isPalindrome(-121));  // false
    console.log(isPalindrome(10));    // false
    console.log(isPalindrome(0));     // true
}

main();
