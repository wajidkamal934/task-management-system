import React from 'react';

const TaskItem = ({ task }) => {
    return (
        <li>
            <h3>{task.task_title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Priority: {task.priority}</p>
            <button>Edit</button>
            <button>Delete</button>
        </li>
    );
};

export default TaskItem;