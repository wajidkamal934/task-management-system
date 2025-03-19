// Simulate a database in localStorage for users
function getUsers() {
    let users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function getTasks() {
    let tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

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

// Fetch tasks for the logged-in user
function fetchTasks() {
    const tasks = getTasks();
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Clear the task list

    tasks.forEach((task) => {
        const li = document.createElement('li');
        li.textContent = `${task.task_title} - ${task.status}`;
        taskList.appendChild(li);
    });
}

// Logout functionality
document.getElementById('logoutButton').addEventListener('click', () => {
    localStorage.removeItem('loggedInUser');
    document.getElementById('loginButton').style.display = 'inline-block';
    document.getElementById('logoutButton').style.display = 'none';
    document.getElementById('taskList').innerHTML = '';
});

// Add task functionality
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

// Display tasks for logged-in user when the page loads
if (localStorage.getItem('loggedInUser')) {
    document.getElementById('loginButton').style.display = 'none';
    document.getElementById('logoutButton').style.display = 'inline-block';
    fetchTasks();
} else {
    document.getElementById('loginButton').style.display = 'inline-block';
}
