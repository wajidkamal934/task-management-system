document.addEventListener('DOMContentLoaded', function () {
    // Debugging: Check if elements exist
    console.log("DOM fully loaded and parsed");

    const loginButton = document.getElementById('loginButton');
    const registerButton = document.getElementById('registerButton');
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const taskForm = document.getElementById('taskForm');
    const logoutButton = document.getElementById('logoutButton');
    
    // Check if the elements exist
    console.log('loginButton', loginButton);
    console.log('registerButton', registerButton);
    console.log('registerForm', registerForm);
    console.log('loginForm', loginForm);

    if (loginButton) {
        loginButton.addEventListener('click', () => {
            console.log("Login button clicked");
            $('#loginModal').modal('show');
        });
    } else {
        console.error("Login button not found");
    }

    if (registerButton) {
        registerButton.addEventListener('click', () => {
            console.log("Register button clicked");
            $('#registerModal').modal('show');
        });
    } else {
        console.error("Register button not found");
    }

    // Handle Register form submission
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log("Register form submitted");

            const username = document.getElementById('registerUsername').value;
            const password = document.getElementById('registerPassword').value;
            const role = document.getElementById('userRole').value;

            const users = getUsers();
            const userExists = users.some(user => user.username === username);

            if (userExists) {
                alert('Username already exists. Please choose another.');
                return;
            }

            const newUser = { username, password, role };
            users.push(newUser);
            saveUsers(users);  // Save users in localStorage

            alert('Registration successful! You can now log in.');
            document.getElementById('registerForm').reset();
            $('#registerModal').modal('hide');
        });
    } else {
        console.error("Register form not found");
    }

    // Handle Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log("Login form submitted");

            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;

            const users = getUsers();
            const user = users.find(user => user.username === username && user.password === password);

            if (user) {
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                document.getElementById('loginButton').style.display = 'none';
                document.getElementById('registerButton').style.display = 'none';
                document.getElementById('dashboardSection').style.display = 'block';

                if (user.role === 'admin') {
                    document.getElementById('dashboardTitle').innerText = 'Admin Dashboard';
                } else {
                    document.getElementById('dashboardTitle').innerText = 'User Dashboard';
                }

                fetchTasks();
                $('#loginModal').modal('hide');
            } else {
                alert('Invalid credentials. Please try again.');
            }
        });
    } else {
        console.error("Login form not found");
    }

    // Handle Task form submission
    if (taskForm) {
        taskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log("Task form submitted");

            const taskTitle = document.getElementById('taskTitle').value;
            const taskDescription = document.getElementById('taskDescription').value;
            const taskStatus = document.getElementById('taskStatus').value;

            const newTask = { task_title: taskTitle, description: taskDescription, status: taskStatus };

            const tasks = getTasks();
            tasks.push(newTask);
            saveTasks(tasks);

            fetchTasks();  // Refresh task list after adding a new task
            $('#taskModal').modal('hide');
        });
    } else {
        console.error("Task form not found");
    }

    // Handle Logout functionality
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('loggedInUser');
            document.getElementById('loginButton').style.display = 'inline-block';
            document.getElementById('registerButton').style.display = 'inline-block';
            document.getElementById('logoutButton').style.display = 'none';
            document.getElementById('dashboardSection').style.display = 'none';
        });
    } else {
        console.error("Logout button not found");
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
