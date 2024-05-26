// fileOperations.ts
import { promises as fs } from 'fs';
import { Employee } from './employee';

const DATA_FILE = 'employees.json';

async function readEmployeesFromFile(): Promise<{ employees: Employee[]; lastId: number }> {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error: any) { // Explicitly type error as any
        // If the file doesn't exist or is empty, return default values
        if (error.code === 'ENOENT') {
            return { employees: [], lastId: 2024000 };
        } else {
            throw error;
        }
    }
}

async function writeEmployeesToFile(employees: Employee[], lastId: number): Promise<void> {
    const data = JSON.stringify({ employees, lastId }, null, 2);
    await fs.writeFile(DATA_FILE, data, 'utf-8');
}

export { readEmployeesFromFile, writeEmployeesToFile };
