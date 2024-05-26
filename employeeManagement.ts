// employeeManagement.ts
import { Employee, employees } from './employee';
import { readEmployeesFromFile, writeEmployeesToFile } from './fileOperations';

let nextId: number;

async function initializeEmployees() {
    const { employees: storedEmployees, lastId } = await readEmployeesFromFile();
    if (storedEmployees) {
        employees.push(...storedEmployees);
    }
    nextId = isNaN(lastId) ? generateNextId() : lastId + 1;
}

function generateNextId(): number {
    const currentYear = new Date().getFullYear();
    const currentSerial = employees.filter(emp => new Date(emp.id).getFullYear() === currentYear).length + 1;
    return parseInt(`${currentYear}${currentSerial.toString().padStart(4, '0')}`);
}

// async function addEmployee(name: string, salary: number): Promise<void> {
//     const newEmployee: Employee = { id: nextId, name, salary };
//     employees.push(newEmployee);
//     nextId = generateNextId();
//     await writeEmployeesToFile(employees, nextId);
//     console.log(`Employee ${name} added successfully with ID ${newEmployee.id}.`);
// }

async function addEmployee(name: string, salary: number): Promise<void> {
    const newEmployee: Employee = { id: nextId, name, salary };
    employees.push(newEmployee);
    await writeEmployeesToFile(employees, nextId);
    nextId = generateNextId();
    console.log(`Employee ${name} added successfully with ID ${newEmployee.id}.`);
}


async function editEmployee(id: number, newName: string, newSalary: number): Promise<void> {
    const employee = employees.find(emp => emp.id === id);
    if (employee) {
        employee.name = newName;
        employee.salary = newSalary;
        await writeEmployeesToFile(employees, nextId);
        console.log(`Employee ${id} updated successfully.`);
    } else {
        console.log(`Employee with ID ${id} not found.`);
    }
}

async function deleteEmployee(id: number): Promise<void> {
    const index = employees.findIndex(emp => emp.id === id);
    if (index !== -1) {
        employees.splice(index, 1);
        await writeEmployeesToFile(employees, nextId);
        console.log(`Employee ${id} deleted successfully.`);
    } else {
        console.log(`Employee with ID ${id} not found.`);
    }
}

function listEmployees(): void {
    console.log('Employee List:');
    employees.forEach(emp => {
        console.log(`ID: ${emp.id}, Name: ${emp.name}, Salary: ${emp.salary}`);
    });
}

export { initializeEmployees, addEmployee, editEmployee, deleteEmployee, listEmployees };
