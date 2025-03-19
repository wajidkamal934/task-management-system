// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Handle Register functionality
    document.getElementById('registerForm').addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;

        // Check if user already exists
        const users = getUsers();
        const userExists = users.some(user => user.username === username);

        if (userExists) {
            alert('Username already exists. Please choose another.');
            return;
        }

        // Add new user
        const newUser = { username, password };
        users.push(newUser);
        saveUsers(users);  // Save users in localStorage

        alert('Registration successful! You can now log in.');
        $('#registerModal').modal('hide');
    });

    // Handle Login functionality
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        // Check if user exists and credentials are correct
        const users = getUsers();
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            document.getElementById('loginButton').style.display = 'none';
            document.getElementById('logoutButton').style.display = 'inline-block';
            fetchTasks(); // Load tasks for the logged-in user
            $('#loginModal').modal('hide');
        } else {
            alert('Invalid credentials. Please try again.');
        }
    });

    // Handle Task addition
    document.getElementById('taskForm').addEventListener('submit', (e) => {
        e.preventDefault();

        const taskTitle = document.getElementById('taskTitle').value;
        const taskDescription = document.getElementById('taskDescription').value;
        const taskStatus = document.getElementById('taskStatus').value;

        const newTask = { task_title: taskTitle, description: taskDescription, status: taskStatus };
        const tasks = getTasks();
        tasks.push(newTask);
        saveTasks(tasks);

        fetchTasks();  // Refresh task list after adding a new task
        document.getElementById('taskModal').style.display = 'none'; // Close modal
    });

    // Add event listener for Add Task button
    document.getElementById('addTaskButton').addEventListener('click', () => {
        document.getElementById('taskModal').style.display = 'flex';
    });

    // Handle Logout functionality
    document.getElementById('logoutButton').addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        document.getElementById('loginButton').style.display = 'inline-block';
        document.getElementById('logoutButton').style.display = 'none';
        document.getElementById('taskList').innerHTML = '';
    });

    // Display tasks for logged-in user when the page loads
    if (localStorage.getItem('loggedInUser')) {
        document.getElementById('loginButton').style.display = 'none';
        document.getElementById('logoutButton').style.display = 'inline-block';
        fetchTasks();
    } else {
        document.getElementById('loginButton').style.display = 'inline-block';
    }
});

// Get tasks from localStorage
function getTasks() {
    let tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

// Save tasks to localStorage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get users from localStorage
function getUsers() {
    let users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

// Save users to localStorage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Fetch tasks from localStorage and render them
function fetchTasks() {
    const tasks = getTasks();
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Clear task list before rendering

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.innerHTML = `${task.task_title} - ${task.status} <button class="btn btn-danger btn-sm" onclick="deleteTask(${index})">Delete</button>`;
        taskList.appendChild(li);
    });
}

// Function to delete a task
function deleteTask(index) {
    const tasks = getTasks();
    tasks.splice(index, 1); // Remove the task from array
    saveTasks(tasks); // Save updated tasks to localStorage
    fetchTasks(); // Re-render task list
}
