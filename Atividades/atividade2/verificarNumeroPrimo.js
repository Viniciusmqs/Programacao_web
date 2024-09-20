function verificaNumeroPrimo(n){
    let state = false;
    if(n <= 1){
        state = true;
    }
    for(let i = 2; i < n; i++) {
        if (n % i == 0) {
            state = true;
            break;
        }
    }
    return !state;
}

console.log(verificaNumeroPrimo(0));
console.log(verificaNumeroPrimo(1));
console.log(verificaNumeroPrimo(2));
console.log(verificaNumeroPrimo(3));
console.log(verificaNumeroPrimo(7));
console.log(verificaNumeroPrimo(83));
console.log(verificaNumeroPrimo(100));
console.log(verificaNumeroPrimo(991));
console.log(verificaNumeroPrimo(104729));
console.log(verificaNumeroPrimo(14348907));