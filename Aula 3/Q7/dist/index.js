"use strict";
class Client {
    constructor(name, startBalance) {
        this.name = name;
        this.balance = startBalance;
    }
    getInfos() {
        return `Name: ${this.name}, Balance: R$${this.balance.toFixed(2)}`;
    }
    deposit(value) {
        if (value <= 0) {
            return console.log("The deposit value must be positive!");
        }
        this.balance += value;
    }
    withdraw(withdrawValue) {
        if (this.validateWithdraw(withdrawValue)) {
            this.balance -= withdrawValue;
            console.log("Withdrawal made successfully!");
        }
        else {
            return console.log('Your account does not have enough balance');
        }
    }
    validateWithdraw(value) {
        if (value <= 0) {
            return false;
        }
        if (value > this.balance) {
            return false;
        }
        return true;
    }
}
const client1 = new Client("Samir", 50000);
const client2 = new Client("Mori", 1500);
console.log(client1.getInfos());
client1.deposit(500);
console.log(client1.getInfos());
client1.withdraw(50000);
console.log(client1.getInfos());
client1.deposit(-50);
client2.deposit(500);
console.log(client2.getInfos());
client2.withdraw(4000);
console.log(client2.getInfos());
client2.withdraw(2000);
console.log(client2.getInfos());
