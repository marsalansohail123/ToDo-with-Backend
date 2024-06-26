import React, { useEffect, useState } from 'react';
import "./App.css"
import axios from 'axios';

function TodoApp() {

  // Add TODO
  const [inputVal, setInputVal] = useState("");
  const addTodo = () => {
    if (!inputVal) {
      alert("Please add TODO")
      return
    }
    // console.log(inputVal)
    const objToSend = {
      todo: inputVal
    }
    axios.post('http://localhost:8000/api/react_todo', objToSend)
      .then((res) => {
        console.log(res)
        setInputVal("")
      }).catch((err) => {
        console.log(err)
      })
  }

  // GET ALL TODOS
  const [todoArr, setTodoArr] = useState([])
  useEffect(() => {
    axios.get("http://localhost:8000/api/react_todo")
      .then((res) => {
        setTodoArr(res.data.data)
      }).catch((err) => console.log(err))
  }, [])
  // console.log(todoArr)

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
            value={inputVal}
            onChange={(e) => { setInputVal(e.target.value) }}
          />
          <button onClick={() => addTodo()} className="add-todo-btn">+</button>
        </div>
        <ul className="todo-list">
          {todoArr.map((data) => (
            <li id={data._id} className="todo-item">
              <label htmlFor="todo-1">{data.todo}</label>
              <div className='func-btn'>
                <button className="edit-todo-btn">Edit</button>
                <button className="delete-todo-btn">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default TodoApp;