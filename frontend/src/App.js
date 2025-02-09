import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Import Routes instead of Switch
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css'; // Make sure to include a CSS file for styling.

const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Task Management Application</h1>
          <nav className="App-nav">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/create">Create Task</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes> {/* Use Routes instead of Switch */}
            <Route path="/" element={<TaskList />} /> {/* Use element instead of component */}
            <Route path="/create" element={<TaskForm />} /> {/* Use element instead of component */}
            {/* Add a catch-all route for unknown paths */}
            <Route path="*" element={<h2>Page Not Found</h2>} />
          </Routes>
        </main>

        <footer>
          <p>&copy; 2025 Task Management Application</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
