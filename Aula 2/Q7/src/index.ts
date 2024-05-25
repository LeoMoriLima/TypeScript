type Employee = {
    name: string;
    valueTime: number;
    workedTime: number;
};

function calculateSalaryTotal(squad: Employee[]): number{
    let totalSalary = 0;
    
    squad.forEach((employee) =>{
        const employeeSalary = employee.valueTime * employee.workedTime;
        totalSalary += employeeSalary
    })

    return totalSalary;
}

const squad: Employee[] = [
    { name: "Letônio", valueTime: 65, workedTime: 40},
    { name: "Samir", valueTime: 155, workedTime: 400},
    { name: "Leonardo", valueTime: 20, workedTime: 30},
]

const totalSalarySquad = calculateSalaryTotal(squad);
console.log('Total squad salary: ' , totalSalarySquad);