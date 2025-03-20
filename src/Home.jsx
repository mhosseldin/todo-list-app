import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null); // Track which todo is being edited
  const [editedText, setEditedText] = useState(""); // Store updated text

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=3")
      .then((response) => response.json())
      .then((data) =>
        setTodos(
          data.map((todo) => ({
            id: todo.id,
            text: todo.title,
            completed: todo.completed,
          }))
        )
      )
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const addTodo = () => {
    if (newTodo.trim() === "") return;

    const newTodoItem = {
      id: todos.length + 1,
      text: newTodo,
      completed: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodoItem]);
    setNewTodo("");
  };

  const removeTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditedText(text);
  };

  const saveEdit = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: editedText } : todo
      )
    );
    setEditingId(null); // Exit edit mode
  };

  return (
    <main className="main">
      <nav className="nav">
        <Link to="/" className="active">
          Home
        </Link>
        <Link to="/about">About</Link>
      </nav>
      <div className="todo-list">
        <h1>Todo List</h1>

        <ul className="todo-list-items">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`todo-item ${todo.completed ? "completed" : ""}`}
            >
              <div
                className="todo-item-text"
                onClick={() => toggleTodo(todo.id)}
              >
                <input type="checkbox" checked={todo.completed} readOnly />
                {editingId === todo.id ? (
                  <input
                    type="text"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && saveEdit(todo.id)} // Save on Enter key
                    autoFocus
                  />
                ) : (
                  <span className="todo">{todo.text}</span>
                )}
              </div>
              <div className="todo-item-actions">
                {editingId === todo.id ? (
                  <>
                    <button onClick={() => saveEdit(todo.id)}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEditing(todo.id, todo.text)}>
                      Edit
                    </button>
                    <button onClick={() => removeTodo(todo.id)}>Delete</button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="new-todo-form">
        <label htmlFor="new-todo">Add a new todo</label>
        <input
          type="text"
          id="new-todo"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>
    </main>
  );
};

export default Home;
