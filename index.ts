// index.ts
import inquirer from 'inquirer';
import { initializeEmployees, addEmployee, editEmployee, deleteEmployee, listEmployees } from './employeeManagement';

async function main() {
    await initializeEmployees();

    while (true) {
        const { action } = await inquirer.prompt({
            type: 'list',
            name: 'action',
            message: 'What do you want to do?',
            choices: ['Add Employee', 'Edit Employee', 'Delete Employee', 'List Employees', 'Exit'],
        });

        switch (action) {
            case 'Add Employee':
                const addResponse = await inquirer.prompt([
                    { type: 'input', name: 'name', message: 'Enter Employee Name:' },
                    { type: 'input', name: 'salary', message: 'Enter Employee Salary:' },
                ]);
                await addEmployee(addResponse.name, Number(addResponse.salary)); // Remove id argument
                break;

            case 'Edit Employee':
                const editResponse = await inquirer.prompt([
                    { type: 'input', name: 'id', message: 'Enter Employee ID to edit:' },
                    { type: 'input', name: 'newName', message: 'Enter New Employee Name:' },
                    { type: 'input', name: 'newSalary', message: 'Enter New Employee Salary:' },
                ]);
                await editEmployee(Number(editResponse.id), editResponse.newName, Number(editResponse.newSalary));
                break;

            case 'Delete Employee':
                const deleteResponse = await inquirer.prompt([
                    { type: 'input', name: 'id', message: 'Enter Employee ID to delete:' },
                ]);
                await deleteEmployee(Number(deleteResponse.id));
                break;

            case 'List Employees':
                listEmployees();
                break;

            case 'Exit':
                return;

            default:
                console.log('Invalid action. Please try again.');
                break;
        }
    }
}

main();
