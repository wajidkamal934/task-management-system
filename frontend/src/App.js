import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
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
          <Switch>
            <Route path="/" exact component={TaskList} />
            <Route path="/create" component={TaskForm} />
            {/* Add a catch-all route for unknown paths */}
            <Route path="*">
              <h2>Page Not Found</h2>
              <p>Sorry, this page does not exist.</p>
            </Route>
          </Switch>
        </main>

        <footer>
          <p>&copy; 2025 Task Management Application</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;