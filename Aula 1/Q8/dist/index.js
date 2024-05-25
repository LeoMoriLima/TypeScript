"use strict";
function subsets(data, start, end) {
    if (typeof data === 'string') {
        return data.substring(start, end + 1);
    }
    else if (Array.isArray(data)) {
        return data.slice(start, end + 1);
    }
    throw new Error('Erro ao processar dados!');
}
const stringExample = 'LeonardoMori';
const arrayExample = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
console.log(subsets(stringExample, 8, 12));
console.log(subsets(arrayExample, 4, 6));
