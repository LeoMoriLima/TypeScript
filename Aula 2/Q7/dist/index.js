"use strict";
function calculateSalaryTotal(squad) {
    let totalSalary = 0;
    squad.forEach((employee) => {
        const employeeSalary = employee.valueTime * employee.workedTime;
        totalSalary += employeeSalary;
    });
    return totalSalary;
}
const squad = [
    { name: "Letônio", valueTime: 65, workedTime: 40 },
    { name: "Samir", valueTime: 155, workedTime: 400 },
    { name: "Leonardo", valueTime: 20, workedTime: 30 },
];
const totalSalarySquad = calculateSalaryTotal(squad);
console.log('Total squad salary: ', totalSalarySquad);
