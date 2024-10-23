// src/App.js
import React, { useState } from 'react';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import { useTasks } from './hooks/useTasks';

function App() {
  const { tasks, addTask, deleteTask, toggleComplete } = useTasks();

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <AddTask addTask={addTask} />
      <TaskList 
        tasks={tasks} 
        deleteTask={deleteTask} 
        toggleComplete={toggleComplete} 
      />
    </div>
  );
}

export default App;
