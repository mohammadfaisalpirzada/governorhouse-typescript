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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// index.ts
const inquirer_1 = __importDefault(require("inquirer"));
const employeeManagement_1 = require("./employeeManagement");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, employeeManagement_1.initializeEmployees)();
        while (true) {
            const { action } = yield inquirer_1.default.prompt({
                type: 'list',
                name: 'action',
                message: 'What do you want to do?',
                choices: ['Add Employee', 'Edit Employee', 'Delete Employee', 'List Employees', 'Exit'],
            });
            switch (action) {
                case 'Add Employee':
                    const addResponse = yield inquirer_1.default.prompt([
                        { type: 'input', name: 'name', message: 'Enter Employee Name:' },
                        { type: 'input', name: 'salary', message: 'Enter Employee Salary:' },
                    ]);
                    yield (0, employeeManagement_1.addEmployee)(addResponse.name, Number(addResponse.salary)); // Remove id argument
                    break;
                case 'Edit Employee':
                    const editResponse = yield inquirer_1.default.prompt([
                        { type: 'input', name: 'id', message: 'Enter Employee ID to edit:' },
                        { type: 'input', name: 'newName', message: 'Enter New Employee Name:' },
                        { type: 'input', name: 'newSalary', message: 'Enter New Employee Salary:' },
                    ]);
                    yield (0, employeeManagement_1.editEmployee)(Number(editResponse.id), editResponse.newName, Number(editResponse.newSalary));
                    break;
                case 'Delete Employee':
                    const deleteResponse = yield inquirer_1.default.prompt([
                        { type: 'input', name: 'id', message: 'Enter Employee ID to delete:' },
                    ]);
                    yield (0, employeeManagement_1.deleteEmployee)(Number(deleteResponse.id));
                    break;
                case 'List Employees':
                    (0, employeeManagement_1.listEmployees)();
                    break;
                case 'Exit':
                    return;
                default:
                    console.log('Invalid action. Please try again.');
                    break;
            }
        }
    });
}
main();
