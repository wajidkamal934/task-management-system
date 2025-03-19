import React, { useState } from 'react';
import axios from 'axios';  

const TaskForm = () => {
    const [task, setTask] = useState({
        task_title: '',
        description: '',
        status: 'To Do',
        priority: 'Low',
    });

    const handleChange = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('task-management-application-d8ab952fd169.herokuapp.com', 'localhost', '127.0.0.1', task)
            .then((response) => {
                console.log('Task created:', response.data);
            })
            .catch((error) => {
                console.error('Error creating task:', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="task_title"
                value={task.task_title}
                onChange={handleChange}
                placeholder="Task Title"
            />
            <textarea
                name="description"
                value={task.description}
                onChange={handleChange}
                placeholder="Task Description"
            />
            <select
                name="priority"
                value={task.priority}
                onChange={handleChange}
            >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <select
                name="status"
                value={task.status}
                onChange={handleChange}
            >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>
            <button type="submit">Create Task</button>
        </form>
    );
};

export default TaskForm;