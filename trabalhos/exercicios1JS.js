function imprimirNumerosPares() {
    let numeros = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
    console.log("pares:");
    for (let num of numeros) {
        if (num % 2 === 0) {
            console.log(num);
        }
    }
}

function contagemRegressiva(numero) {
    if (numero < 10) {
        console.log("número invalido, digite outro");
        return;
    }
    console.log("contagem regressiva:");
    for (let i = 10; i >= numero; i--) {
        console.log(i);
    }
}

function somaElementosVetor(vetor) {
    let soma = 0;
    for (let num of vetor) {
        soma += num;
    }
    console.log("soma total: ", soma);
}

function verificarNumerosPrimos() {
    let numeros = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
    console.log("números primos: ");
    for (let num of numeros) {
        if (ehPrimo(num)) {
            console.log(num);
        }
    }
}

function ehPrimo(numero) {
    if (numero <= 1) return false;
    for (let i = 2; i <= Math.sqrt(numero); i++) {
        if (numero % i === 0) return false;
    }
    return true;
}

function calcularMediaNotas() {
    let notas = Array.from({ length: 5 }, () => Math.floor(Math.random() * 10) + 1);
    let soma = 0;
    for (let nota of notas) {
        soma += nota;
    }
    let media = soma / notas.length;
    console.log("Média das notas:", media.toFixed(2));
    console.log(media >= 7 ? "Aprovado" : "Reprovado");
}