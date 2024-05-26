"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listEmployees = exports.deleteEmployee = exports.editEmployee = exports.addEmployee = exports.initializeEmployees = void 0;
// employeeManagement.ts
const employee_1 = require("./employee");
const fileOperations_1 = require("./fileOperations");
let nextId;
function initializeEmployees() {
    return __awaiter(this, void 0, void 0, function* () {
        const { employees: storedEmployees, lastId } = yield (0, fileOperations_1.readEmployeesFromFile)();
        if (storedEmployees) {
            employee_1.employees.push(...storedEmployees);
        }
        nextId = isNaN(lastId) ? generateNextId() : lastId + 1;
    });
}
exports.initializeEmployees = initializeEmployees;
function generateNextId() {
    const currentYear = new Date().getFullYear();
    const currentSerial = employee_1.employees.filter(emp => new Date(emp.id).getFullYear() === currentYear).length + 1;
    return parseInt(`${currentYear}${currentSerial.toString().padStart(4, '0')}`);
}
// async function addEmployee(name: string, salary: number): Promise<void> {
//     const newEmployee: Employee = { id: nextId, name, salary };
//     employees.push(newEmployee);
//     nextId = generateNextId();
//     await writeEmployeesToFile(employees, nextId);
//     console.log(`Employee ${name} added successfully with ID ${newEmployee.id}.`);
// }
function addEmployee(name, salary) {
    return __awaiter(this, void 0, void 0, function* () {
        const newEmployee = { id: nextId, name, salary };
        employee_1.employees.push(newEmployee);
        yield (0, fileOperations_1.writeEmployeesToFile)(employee_1.employees, nextId);
        nextId = generateNextId();
        console.log(`Employee ${name} added successfully with ID ${newEmployee.id}.`);
    });
}
exports.addEmployee = addEmployee;
function editEmployee(id, newName, newSalary) {
    return __awaiter(this, void 0, void 0, function* () {
        const employee = employee_1.employees.find(emp => emp.id === id);
        if (employee) {
            employee.name = newName;
            employee.salary = newSalary;
            yield (0, fileOperations_1.writeEmployeesToFile)(employee_1.employees, nextId);
            console.log(`Employee ${id} updated successfully.`);
        }
        else {
            console.log(`Employee with ID ${id} not found.`);
        }
    });
}
exports.editEmployee = editEmployee;
function deleteEmployee(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const index = employee_1.employees.findIndex(emp => emp.id === id);
        if (index !== -1) {
            employee_1.employees.splice(index, 1);
            yield (0, fileOperations_1.writeEmployeesToFile)(employee_1.employees, nextId);
            console.log(`Employee ${id} deleted successfully.`);
        }
        else {
            console.log(`Employee with ID ${id} not found.`);
        }
    });
}
exports.deleteEmployee = deleteEmployee;
function listEmployees() {
    console.log('Employee List:');
    employee_1.employees.forEach(emp => {
        console.log(`ID: ${emp.id}, Name: ${emp.name}, Salary: ${emp.salary}`);
    });
}
exports.listEmployees = listEmployees;
