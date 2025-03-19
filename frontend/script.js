const API_URL = 'http://localhost:8000';  // Change to your backend URL
let token = localStorage.getItem('token');  // Get token from local storage if logged in

// Show or hide the task section based on login status
if (token) {
    document.getElementById('loginButton').style.display = 'none';
    document.getElementById('logoutButton').style.display = 'inline-block';
    fetchTasks();
} else {
    document.getElementById('loginButton').style.display = 'inline-block';
    document.getElementById('logoutButton').style.display = 'none';
}

// Login functionality
document.getElementById('loginButton').addEventListener('click', () => {
    const username = prompt('Enter your username:');
    const password = prompt('Enter your password:');
    
    axios.post(`${API_URL}/login/`, { username, password })
        .then(response => {
            token = response.data.token;
            localStorage.setItem('token', token);
            document.getElementById('loginButton').style.display = 'none';
            document.getElementById('logoutButton').style.display = 'inline-block';
            fetchTasks();
        })
        .catch(error => {
            alert('Login failed. Please check your credentials.');
        });
});

// Logout functionality
document.getElementById('logoutButton').addEventListener('click', () => {
    localStorage.removeItem('token');
    document.getElementById('loginButton').style.display = 'inline-block';
    document.getElementById('logoutButton').style.display = 'none';
    document.getElementById('taskList').innerHTML = '';  // Clear task list
});

// Fetch tasks from the backend
function fetchTasks() {
    axios.get(`${API_URL}/tasks/`, { headers: { Authorization: `Token ${token}` } })
        .then(response => {
            const taskList = document.getElementById('taskList');
            taskList.innerHTML = '';  // Clear the existing list
            response.data.forEach(task => {
                const li = document.createElement('li');
                li.textContent = task.task_title;
                taskList.appendChild(li);
            });
        })
        .catch(error => {
            alert('Failed to fetch tasks. Please try again later.');
        });
}

// Open the task modal
document.getElementById('addTaskButton').addEventListener('click', () => {
    document.getElementById('taskModal').style.display = 'flex';
});

// Close the task modal
document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('taskModal').style.display = 'none';
});

// Submit new task
document.getElementById('taskForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const taskTitle = document.getElementById('taskTitle').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const taskStatus = document.getElementById('taskStatus').value;

    axios.post(`${API_URL}/tasks/`, {
        task_title: taskTitle,
        description: taskDescription,
        status: taskStatus
    }, {
        headers: { Authorization: `Token ${token}` }
    })
    .then(response => {
        fetchTasks();  // Refresh task list after adding a new task
        document.getElementById('taskModal').style.display = 'none';  // Close the modal
    })
    .catch(error => {
        alert('Failed to add task. Please try again.');
    });
});