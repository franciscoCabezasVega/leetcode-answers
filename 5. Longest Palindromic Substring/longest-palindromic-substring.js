function longestPalindrome(s) {
    if (!s || s.length < 1) return '';

    function expandAroundCenter(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--;
            right++;
        }
        return s.substring(left + 1, right);
    }

    let longest = '';

    for (let i = 0; i < s.length; i++) {
        const p1 = expandAroundCenter(i, i);
        const p2 = expandAroundCenter(i, i + 1);

        if (p1.length > longest.length) longest = p1;
        if (p2.length > longest.length) longest = p2;
    }

    return longest;
}

function main() {
    console.log(longestPalindrome("babad")); // "bab" o "aba"
    console.log(longestPalindrome("cbbd"));  // "bb"
    console.log(longestPalindrome("a"));     // "a"
    console.log(longestPalindrome("ac"));    // "a" o "c"
}

main();
