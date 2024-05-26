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
exports.writeEmployeesToFile = exports.readEmployeesFromFile = void 0;
// fileOperations.ts
const fs_1 = require("fs");
const DATA_FILE = 'employees.json';
function readEmployeesFromFile() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield fs_1.promises.readFile(DATA_FILE, 'utf-8');
            return JSON.parse(data);
        }
        catch (error) { // Explicitly type error as any
            // If the file doesn't exist or is empty, return default values
            if (error.code === 'ENOENT') {
                return { employees: [], lastId: 2024000 };
            }
            else {
                throw error;
            }
        }
    });
}
exports.readEmployeesFromFile = readEmployeesFromFile;
function writeEmployeesToFile(employees, lastId) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = JSON.stringify({ employees, lastId }, null, 2);
        yield fs_1.promises.writeFile(DATA_FILE, data, 'utf-8');
    });
}
exports.writeEmployeesToFile = writeEmployeesToFile;
