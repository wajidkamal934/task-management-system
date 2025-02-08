import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Change Switch to Routes
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

const App = () => {
  return (
      <Router>
          <div>
              <h1>Task Management System</h1>
              <nav>
                  <a href="/">Home</a> | <a href="/create">Create Task</a>
              </nav>
              <Routes>  {/* Use Routes instead of Switch */}
                  <Route path="/" element={<TaskList />} />  {/* Use element instead of component */}
                  <Route path="/create" element={<TaskForm />} />  {/* Use element instead of component */}
              </Routes>
          </div>
      </Router>
  );
};

export default App;
