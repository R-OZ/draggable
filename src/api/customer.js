// src/api/customer.js
import { BASE_URL } from "./constants/constants";

export const addCustomer = async (customerData) => {
    try {
        const response = await fetch(`${BASE_URL}/customer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customerData)
        });
        if (!response.ok) {
            throw new Error('Failed to add customer');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding customer:', error.message);
        throw error;
    }
};

export const updateCustomer = async (customerId, customerData) => {
    try {
        const response = await fetch(`${BASE_URL}/customer/${customerId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customerData)
        });
        if (!response.ok) {
            throw new Error('Failed to update customer');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating customer:', error.message);
        throw error;
    }
};
