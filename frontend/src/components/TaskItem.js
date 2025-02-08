import React, { useState } from 'react';
import { updateTaskStatus } from '../api';

const TaskItem = ({ task }) => {
    const [status, setStatus] = useState(task.status);

    const handleStatusChange = async (newStatus) => {
        await updateTaskStatus(task.id, newStatus);
        setStatus(newStatus);
    };

    return (
        <li>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {status}</p>
            <button onClick={() => handleStatusChange('In Progress')}>In Progress</button>
            <button onClick={() => handleStatusChange('Completed')}>Completed</button>
        </li>
    );
};

export default TaskItem;
