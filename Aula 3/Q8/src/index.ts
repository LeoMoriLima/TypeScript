class Calculator {
    public sum(x: number, y: number): number {
        return x + y
    }

    public subtract(x: number, y: number): number {
        return x - y
    }

    public multiply(x: number, y: number): number{
        return x * y
    }

    public divide(x: number, y: number): number | string{
        if(y === 0){
            return "Division by zero is not allowed"
        }
        return x / y
    }
}

class scientificCalculator extends Calculator {
    public power(base: number, exponent: number):number {
        return Math.pow(base, exponent);
    }

    public factorial(number: number): number | string {
        if (number < 0 || !Number.isInteger(number)){
            return "The number must be greater than 0 and integer"
        }

        let result = 1;
        const numbers = Array.from({ length: number }, (_, i) => i + 1);
        numbers.forEach(num => {
            result *= num;
        });    

        return result;
    }


}

class financialCalculator extends Calculator {
    public simpleInterest(capital: number, rate: number, time: number): number{
        return capital * rate * time;
    }

    public compoundInterest(capital: number, rate: number, time: number): number {
        return capital * Math.pow((1 + rate), time) - capital;
    }
}

const calculator = new Calculator();

console.log("--------------------Regular Calculator--------------------");
console.log("Sum: 88 +  12 =", calculator.sum(88, 12));
console.log("Subtract: 45 - 25 =", calculator.subtract(45, 25));
console.log("Multipy: 90 * 10 =", calculator.multiply(90, 10));
console.log("Divide: 80 / 4 =", calculator.divide(80, 4));
console.log("----------------------------------------------------------");

const sciCalculator = new scientificCalculator();

console.log("--------------------Scientific Calculator--------------------");
console.log("Sum: 42 +  8 =", sciCalculator.sum(42, 8));
console.log("Subtract: 35 - 15 =", sciCalculator.subtract(35, 15));
console.log("Multipy: 80 * 5 =", sciCalculator.multiply(80, 5));
console.log("Divide: 81 / 9 =", sciCalculator.divide(81, 9));
console.log("Power: 4^2 =", sciCalculator.power(4, 2));
console.log("Power: 8^0 =", sciCalculator.power(8, 0) );
console.log("Factorial: 5! =", sciCalculator.factorial(5));
console.log("Factorial: 10! =", sciCalculator.factorial(10));
console.log("-------------------------------------------------------------");

const finCalculator = new financialCalculator();

console.log("--------------------Financial Calculator--------------------");
console.log("Sum: 36 +  4 =", finCalculator.sum(36, 4));
console.log("Subtract: 20 - 5 =", finCalculator.subtract(20, 5));
console.log("Multipy: 11 * 8 =", finCalculator.multiply(11, 8));
console.log("Divide: 45 / 5 =", finCalculator.divide(45, 5));
console.log("Simple Interest: Capital = 1000, Rate = 0.05, Time = 2 =", finCalculator.simpleInterest(1000, 0.05, 2));
console.log("Compound Interest: Capital = 2000, Rate = 0.07, Time = 4 =", finCalculator.compoundInterest(2000, 0.07, 4));
console.log("------------------------------------------------------------");