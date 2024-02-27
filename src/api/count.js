// src/api/count.js
import { BASE_URL } from "./constants/constants";

export const getAddCount = async () => {
    try {
        const response = await fetch(`${BASE_URL}/count/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch add count');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching add count:', error.message);
        throw error;
    }
};

export const getUpdateCount = async () => {
    try {
        const response = await fetch(`${BASE_URL}/count/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch update count');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching update count:', error.message);
        throw error;
    }
};
