// src/App.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, removeTask, toggleTask, editTask, clearCompleted } from './tasksSlice';

const App = () => {
  const [taskText, setTaskText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [filter, setFilter] = useState('all');
  const tasks = useSelector(state => state.tasks);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (taskText.trim()) {
      dispatch(addTask(taskText));
      setTaskText('');
    }
  };

  const handleEditTask = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const handleSaveEdit = (id) => {
    if (editText.trim()) {
      dispatch(editTask({ id, text: editText }));
      setEditingId(null);
      setEditText('');
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Task Manager</h1>
      <div className="mb-4">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          className="border p-2 mr-2"
          placeholder="Enter a task"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white p-2"
        >
          Add Task
        </button>
      </div>
      <div className="mb-4">
        <button onClick={() => setFilter('all')} className={`p-2 ${filter === 'all' ? 'bg-gray-300' : ''}`}>All</button>
        <button onClick={() => setFilter('active')} className={`p-2 ml-2 ${filter === 'active' ? 'bg-gray-300' : ''}`}>Active</button>
        <button onClick={() => setFilter('completed')} className={`p-2 ml-2 ${filter === 'completed' ? 'bg-gray-300' : ''}`}>Completed</button>
      </div>
      <ul>
        {filteredTasks.map(task => (
          <li key={task.id} className="mb-2 flex items-center">
            {editingId === task.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="border p-2"
                />
                <button
                  onClick={() => handleSaveEdit(task.id)}
                  className="bg-green-500 text-white p-1 ml-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="bg-gray-500 text-white p-1 ml-2"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span
                  onClick={() => dispatch(toggleTask(task.id))}
                  className={`cursor-pointer flex-grow ${task.completed ? 'line-through' : ''}`}
                >
                  {task.text}
                </span>
                <button
                  onClick={() => handleEditTask(task.id, task.text)}
                  className="bg-yellow-500 text-white p-1 ml-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => dispatch(removeTask(task.id))}
                  className="bg-red-500 text-white p-1 ml-2"
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      <button
        onClick={() => dispatch(clearCompleted())}
        className="bg-purple-500 text-white p-2 mt-4"
      >
        Clear Completed
      </button>
    </div>
  );
};

export default App;
