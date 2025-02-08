import axios from 'axios';

const API_URL = "https://task-management-application-d8ab952fd169.herokuapp.com/";  // Change this to the production URL when deploying

// Get all tasks
export const getTasks = async () => {
    const response = await axios.get(`${API_URL}/tasks/`);
    return response.data;
};

// Create a new task
export const createTask = async (taskData) => {
    const response = await axios.post(`${API_URL}/tasks/`, taskData);
    return response.data;
};

// Update task status
export const updateTaskStatus = async (taskID, status) => {
    const response = await axios.patch(`${API_URL}/tasks/${taskID}/`, { status });
    return response.data;
};
