function countingWords(words: string): number {
    const cleanWords = words.trim().replace(/\s+/g, ' ');

    const counterWords = cleanWords.split(' ');

    return counterWords.length;
}

const textExample = 'Testando a função de contar palavras criado utilizando typescript e compilando para JavaScript!';

console.log(`O Número de palavras no texto é de: ${countingWords(textExample)}`);