import React, { useState } from "react";
import "./App.css";

function Todo({ todo, index, checkTodo, removeTodo }) {
  return (
    <div className="todo">

      <p style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>{index + 1})&nbsp;{todo.text}</p>

      <div className="buttons">
        <button onClick={() => checkTodo(index)} className={ todo.isCompleted ? "done" : "" }>{todo.check}</button>
        <button onClick={() => removeTodo(index)}>✖</button>
      </div>

    </div>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button type="submit">Добавить</button>
    </form>
  );
}

function App() {
  const [todos, setTodos] = useState([
    {
      text: "Написать TODO List",
      isCompleted: false,
      check: "✔"
    },
    {
      text: "Сделать более-менее красиво",
      isCompleted: false,
      check: "✔"
    },
    {
      text: "Показать TODO List",
      isCompleted: false,
      check: "✔"
    }
  ]);

  const addTodo = text => {
    const newTodos = [...todos, { text, isCompleted: false, check: "✔"}];
    setTodos(newTodos);
  };

  const checkTodo = index => {
    const newTodos = [...todos];
    if(newTodos[index].isCompleted) {
      newTodos[index].isCompleted = false;
      newTodos[index].check = "✔";
    }
    else {
      newTodos[index].isCompleted = true;
      newTodos[index].check = "↺";
    }
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="todo-list">
        <div className="title">
          <h1>Вот что мы с тобой сегодня сделаем:</h1>
        </div>
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            checkTodo={checkTodo}
            removeTodo={removeTodo}
          />
        ))}
      </div>
      <TodoForm addTodo={addTodo} />
    </div>
  );
}

export default App;