function convert(s, numRows) {
    if (numRows === 1 || numRows >= s.length) {
        return s;
    }

    const rows = new Array(numRows).fill("");
    let currRow = 0;
    let direction = -1;

    for (const char of s) {
        rows[currRow] += char;
        if (currRow === 0 || currRow === numRows - 1) {
            direction *= -1;
        }
        currRow += direction;
    }

    return rows.join("");
}

function main() {
    console.log(convert("PAYPALISHIRING", 3)); // "PAHNAPLSIIGYIR"
    console.log(convert("PAYPALISHIRING", 4)); // "PINALSIGYAHRPI"
    console.log(convert("A", 1));              // "A"
}

main();
