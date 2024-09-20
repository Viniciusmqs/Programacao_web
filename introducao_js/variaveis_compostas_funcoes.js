const notas = [9,8.5,7,'10', false];


notas[4] = true;

console.log(notas);

console.log(notas.length);

for(let i = 0; i < notas.length; i++) {
    if(typeof notas[i] === 'number') {
        if(notas[i] >= 7) {
            console.log(`Nota ${i+1}: Aprovado`);
        } else {
            console.log(`Nota : Reprovado`);
        }
        } else {
            console.log(`Nota ${i+1}: Nota inválida`);
        
        }
}

let A = [
    [2, 1, 0],
    [0, 1, 0],
    [1, 2, 1]
];

console.log(A[2][2]);

let capitais = {
    DF: 'brasilia',
    DF_DDD:61,
    BA: 'salvador',
    BA_DDD:71,
    SP: 'sao paulo',
    SP_DDD:11
}

console.log(capitais.BA_DDD);

for (const key in capitais) {
    const capitais = capitais[key];
    const valor = capitais [key];

    console.log(key + ' - ' + valor);
}

/** 
@param (integer) n
@returns {Boolean}
*/

function verificarNumeroPAR(n){
    if(n % 2 == 0) {
        return true;
    } else {
        return false;
    }
}

console.log(verificarNumeroPAR(2));
console.log(verificarNumeroPAR(3));