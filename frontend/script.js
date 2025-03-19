document.addEventListener('DOMContentLoaded', function () {
    // Check if user is logged in
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (loggedInUser) {
        const user = JSON.parse(loggedInUser);
        document.getElementById('loginButton').style.display = 'none';
        document.getElementById('registerButton').style.display = 'none';
        document.getElementById('dashboardSection').style.display = 'block';

        // Show different dashboards based on user role
        if (user.role === 'admin') {
            document.getElementById('dashboardTitle').innerText = 'Admin Dashboard';
        } else {
            document.getElementById('dashboardTitle').innerText = 'User Dashboard';
        }
        
        fetchTasks();
    } else {
        document.getElementById('loginButton').style.display = 'inline-block';
        document.getElementById('registerButton').style.display = 'inline-block';
        document.getElementById('dashboardSection').style.display = 'none';
    }

    // Show Login Modal when login button is clicked
    document.getElementById('loginButton').addEventListener('click', () => {
        $('#loginModal').modal('show');
    });

    // Show Register Modal when register button is clicked
    document.getElementById('registerButton').addEventListener('click', () => {
        $('#registerModal').modal('show');
    });

    // Handle Register form submission
    document.getElementById('registerForm').addEventListener('submit', (e) => {
        e.preventDefault();

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
        
        // Clear form fields and close modal
        document.getElementById('registerForm').reset();
        $('#registerModal').modal('hide');
    });

    // Handle Login form submission
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        const users = getUsers();
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            document.getElementById('loginButton').style.display = 'none';
            document.getElementById('registerButton').style.display = 'none';
            document.getElementById('dashboardSection').style.display = 'block';

            // Redirect to the appropriate dashboard based on the role
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

    // Handle Task form submission
    document.getElementById('taskForm').addEventListener('submit', (e) => {
        e.preventDefault();

        const taskTitle = document.getElementById('taskTitle').value;
        const taskDescription = document.getElementById('taskDescription').value;
        const taskStatus = document.getElementById('taskStatus').value;

        const newTask = { task_title: taskTitle, description: taskDescription, status: taskStatus };

        // Fetch existing tasks from localStorage, add new task, and save back to localStorage
        const tasks = getTasks();
        tasks.push(newTask);
        saveTasks(tasks);

        fetchTasks();  // Refresh task list after adding a new task

        // Close the modal after task is added
        $('#taskModal').modal('hide');
    });

    // Handle Logout functionality
    document.getElementById('logoutButton').addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        document.getElementById('loginButton').style.display = 'inline-block';
        document.getElementById('registerButton').style.display = 'inline-block';
        document.getElementById('logoutButton').style.display = 'none';
        document.getElementById('dashboardSection').style.display = 'none';
    });
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
