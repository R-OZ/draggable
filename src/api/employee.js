// src/api/employee.js
import { BASE_URL } from "./constants/constants";

export const addEmployee = async (employeeData) => {
    try {
        const response = await fetch(`${BASE_URL}/employee`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employeeData)
        });
        if (!response.ok) {
            throw new Error('Failed to add employee');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding employee:', error.message);
        throw error;
    }
};

export const updateEmployee = async (employeeId, employeeData) => {
    try {
        const response = await fetch(`${BASE_URL}/employee/${employeeId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employeeData)
        });
        if (!response.ok) {
            throw new Error('Failed to update employee');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating employee:', error.message);
        throw error;
    }
};
