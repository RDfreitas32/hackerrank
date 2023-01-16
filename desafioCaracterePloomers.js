
'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

function alternate(s) {
    let palavraLetras = [...new Set(s)];
    let stringInicial = [];
    let tamanhoTotal = 0;
    
    for (let i = 0; i < palavraLetras.length; i++) {
        for (let j = i + 1; j < palavraLetras.length; j++) {
            const str = palavraLetras[i] + '|' + palavraLetras[j];
            const pattern = new RegExp(str, 'g');
            stringInicial.push(s.match(pattern));
        }
    }
 
    for (let i = 0; i < stringInicial.length; i++) {
        for (let j = 1; j < stringInicial[i].length; j++) {
            if (stringInicial[i][j-1] === stringInicial[i][j]) {
                stringInicial.splice(i, 1);
                i--;
                break;
            }
            if (j + 1 === stringInicial[i].length) {
                tamanhoTotal = j + 1 > tamanhoTotal ? j + 1 : tamanhoTotal;
            }
        }
    }
    
    return tamanhoTotal
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const l = parseInt(readLine().trim(), 10);

    const s = readLine();

    const result = alternate(s);

    ws.write(result + '\n');

    ws.end();
}


