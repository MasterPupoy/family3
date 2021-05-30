// make the first letter uppercase 
export function capitalize(str) {
    let remaining = [];
    for (let i = 1; i < str.length; i++) {
        remaining += str[i];
    }

    let capitalizedLetter = str[0].toUpperCase();

    let word = capitalizedLetter.concat(remaining);

    return word.toString();
};

