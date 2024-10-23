// src/hooks/useTasks.js
import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const useTasks = () => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, complete: !task.complete } : task
    ));
  };

  return { tasks, addTask, deleteTask, toggleComplete };
};
