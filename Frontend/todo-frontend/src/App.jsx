import React from 'react';
import "./App.css"

function TodoApp() {
  return (
    <div className="todo-app">
      <header>
        <h1>TODO App</h1>
      </header>
      <main>
        <div className='form'>
          <input
            type="text"
            placeholder="Add new todo..."
            className="new-todo-input"
          />
          <button onClick={() => console.log("hello")} className="add-todo-btn">+</button>
        </div>
        <ul className="todo-list">
          <li className="todo-item">
            <label htmlFor="todo-1">TODO LIST 1</label>
            <div className='func-btn'>
              <button className="edit-todo-btn">Edit</button>
              <button className="delete-todo-btn">Delete</button>
            </div>
          </li>
        </ul>
      </main>
    </div>
  );
}

export default TodoApp;