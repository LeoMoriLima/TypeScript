function add(num1: number, num2: number):number | string  {
    
    if (Number.isNaN(num1) || Number.isNaN(num2)){
        return "Uma ou ambas as entradas não são números válidos. Por favor, insira valores numéricos.";;
    }
    
    if (!isFinite(num1) || !isFinite(num2)) {
        return "Erro: Um ou ambos os números não são finitos!";
    }

    return num1 + num2;
}

function substract(num1: number, num2: number):number | string  {
    
    if (Number.isNaN(num1) || Number.isNaN(num2)){
        return "Uma ou ambas as entradas não são números válidos. Por favor, insira valores numéricos.";;
    }

    if (!isFinite(num1) || !isFinite(num2)) {
        return "Erro: Um ou ambos os números não são finitos!";
    }

    return num1 - num2;
}

function multiply(num1: number, num2: number):number | string  {
    
    if (Number.isNaN(num1) || Number.isNaN(num2)){
        return "Uma ou ambas as entradas não são números válidos. Por favor, insira valores numéricos.";;
    }
    
    if (!isFinite(num1) || !isFinite(num2)) {
        return "Erro: Um ou ambos os números não são finitos!";
    }

    return num1 * num2;
}

function divide(num1: number, num2: number):number | string {

    if (Number.isNaN(num1) || Number.isNaN(num2)){
        return "Uma ou ambas as entradas não são números válidos. Por favor, insira valores numéricos.";;
    }

    if (!isFinite(num1) || !isFinite(num2)) {
        return "Erro: Um ou ambos os números não são finitos!";
    }

    if(Number(num2) === 0){
        return "Erro: a divisão por zero não é permitida!"
    }
    
    return num1 / num2;
}

export {
    add,
    substract,
    multiply,
    divide,
}