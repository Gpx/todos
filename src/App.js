import React, { useState, useEffect } from "react";
import uuid from "uuid/v4";
import styled, { createGlobalStyle } from "styled-components";
import Todos from "./components/Todos";
import TodoForm from "./components/TodoForm";

const GlobalStyle = createGlobalStyle`
  body{
    background: #455d7a;
    color: #fff;
  }
`;

const Container = styled.div`
  width: 40vw;
  min-height: 100vh;
  margin: auto;
  background: #233142;
  padding: 16px 32px;
`;

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Hola", completed: false },
    { id: 2, text: "sup?", completed: false }
  ]);

  function handleCreateTodo(text) {
    todos.push({ id: uuid(), text, completed: false });
    setTodos(todos);
  }

  function completeTodo(todo) {
    const selectedTodo = todos.find(t => t.id === todo.id);
    selectedTodo.completed = !selectedTodo.completed;
    setTodos(todos);
  }

  function handleUpdateText(todo, text) {
    const selectedTodo = todos.find(t => t.id === todo.id);
    selectedTodo.text = text;
    setTodos(todos);
  }

  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(
    () => {
      function handleKeyPress(evt) {
        if (evt.target !== document.body) return;
        switch (evt.key) {
          case "j":
            setSelectedIndex(Math.min(selectedIndex + 1, todos.length - 1));
            break;
          case "k":
            setSelectedIndex(Math.max(selectedIndex - 1, 0));
            break;
          default:
        }
      }
      document.addEventListener("keyup", handleKeyPress);

      return () => document.removeEventListener("keyup", handleKeyPress);
    },
    [selectedIndex, todos]
  );

  const pending = todos.filter(todo => !todo.completed);

  return (
    <Container>
      <GlobalStyle />
      You have {pending.length} todos left
      <Todos
        todos={pending}
        selectedIndex={selectedIndex}
        onComplete={completeTodo}
        onUpdateText={handleUpdateText}
      />
      <TodoForm onCreateTodo={handleCreateTodo} />
    </Container>
  );
}

export default App;
