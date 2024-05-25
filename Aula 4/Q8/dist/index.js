"use strict";
class DBConnection {
    constructor(connectString) {
        this.connectString = connectString;
        if (DBConnection.instance) {
            return DBConnection.instance;
        }
        DBConnection.instance = this;
        console.log(`Connect to db: ${this.connectString}`);
    }
}
const db1 = new DBConnection("db://rex:123@gost:333/mydb*");
const db2 = new DBConnection("db://rex:123@gost:333/mydb*");
const db3 = new DBConnection("db://rex:123@gost:333/mydb*");
console.log("As instâncias são iguais?", db1 === db2);
console.log("As instâncias são iguais?", db1 === db3);
