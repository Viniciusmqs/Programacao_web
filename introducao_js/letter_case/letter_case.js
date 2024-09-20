function to_upper(word) {
    if (typeof word != "string") {
        return false;
    }
    return word.toUpperCase();
}

function to_lower(word) {
    if (typeof word != "string") {
        return false;
    }
    return word.toLowerCase();
}

module.exports = {
    to_upper,
    to_lower
}