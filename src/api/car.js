import { BASE_URL } from "./constants/constants";

export const addCar = async (carData) => {
    try {
        const response = await fetch(`${BASE_URL}/car`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(carData)
        });
        if (!response.ok) {
            throw new Error('Failed to add car');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding car:', error.message);
        throw error;
    }
};

export const updateCar = async (carId, carData) => {
    try {
        const response = await fetch(`${BASE_URL}/car/${carId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(carData)
        });
        if (!response.ok) {
            throw new Error('Failed to update car');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating car:', error.message);
        throw error;
    }
};
