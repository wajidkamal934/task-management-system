import React, { useState } from 'react';
import { createTask } from '../api';

const TaskForm = () => {
    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        priority: '',
        status: 'To Do',
    });

    const handleChange = (e) => {
        setTaskData({ ...taskData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTask = await createTask(taskData);
        console.log(newTask);
        setTaskData({ title: '', description: '', priority: '', status: 'To Do' }); // Reset form
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                value={taskData.title}
                onChange={handleChange}
                placeholder="Task Title"
                required
            />
            <textarea
                name="description"
                value={taskData.description}
                onChange={handleChange}
                placeholder="Task Description"
                required
            />
            <select
                name="priority"
                value={taskData.priority}
                onChange={handleChange}
            >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <button type="submit">Create Task</button>
        </form>
    );
};

export default TaskForm;
