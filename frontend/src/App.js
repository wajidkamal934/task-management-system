import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

const App = () => {
  return (
    <Router>
      <div>
        <h1>Task Management Application</h1>
        <nav>
          <a href="/">Home</a> | <a href="/create">Create Task</a>
        </nav>
        <Switch>
          <Route path="/" exact component={TaskList} />
          <Route path="/create" component={TaskForm} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;