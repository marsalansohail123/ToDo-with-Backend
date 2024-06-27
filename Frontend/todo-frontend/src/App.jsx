import React, { useEffect, useState } from 'react';
import "./App.css"
import axios from 'axios';

function TodoApp() {

  // Global State
  const [newTodo, setNewTodo] = useState([])

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
        if (res.data.status == true) {
          setNewTodo(!newTodo)
        }
        // console.log(res)
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
  }, [newTodo])
  // console.log(todoArr)

  // Edit Todo
  const editTodo = (uid) => {
    // console.log(uid)
    const newVal = prompt("Enter New Value");
    const objToSend = {
      todo: newVal,
      id: uid
    };
    axios.put("http://localhost:8000/api/react_todo", objToSend)
      .then((res) => {
        if (res.data.status === true) {
          setNewTodo(!newTodo)
        }
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
  }

  // Delete Todo
  const deleteSingleTodo = (uid) => {
    // console.log(uid)
    axios.delete(`http://localhost:8000/api/react_todo/${uid}`)
      .then((res) => {
        if (res.data.status) {
          setNewTodo(!newTodo)
        }
      }).catch((err) => {
        console.log("err", err)
      })
  }

  // Delete All Todo
  const deleteAllTodo = () => {
    axios.delete("http://localhost:8000/api/react_todo")
      .then((res) => {
        if (res.data.status) {
          setNewTodo(!newTodo);
          return
        }
        // console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    alert("All Todo's Deleted");
  }

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
                <button onClick={() => { editTodo(data._id) }} className="edit-todo-btn">Edit</button>
                <button onClick={() => deleteSingleTodo(data._id)} className="delete-todo-btn">Delete</button>
              </div>
            </li>
          ))}
        </ul>
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <button onClick={() => deleteAllTodo()} className="delete-all-todo-btn">Delete All</button>
        </div>
      </main>
    </div>
  );
}

export default TodoApp;