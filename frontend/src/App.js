import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Use Routes from react-router-dom
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


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
          <Routes> {/* Routes instead of Switch */}
            <Route path="/" element={<TaskList />} /> {/* Use element instead of component */}
            <Route path="/create" element={<TaskForm />} /> {/* Use element instead of component */}
            <Route path="*" element={<h2>Page Not Found</h2>} /> {/* Catch-all route */}
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
