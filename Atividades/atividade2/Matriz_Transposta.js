let a = [[1,2],
         [3,4],
         [5,6]];

function transporMatriz(A){
    console.log("Original");
    for(let i = 0; i < A.length; i++){
        console.log(A[i]);
    }


    let linhas = A.length;
    let colunas = A[0].length;

    let matrizTrasp = [];

    for(let i = 0;i < colunas; i++){
        matrizTrasp[i] = [];
        for(let j = 0; j < linhas; j++){
            matrizTrasp[i][j] = A[j][i];
        }
    }

    console.log("Transposta");
    for(let i = 0; i < matrizTrasp.length; i++){
        console.log(matrizTrasp[i])
    }
}

transporMatriz(a);