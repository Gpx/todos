import React, { useState, useEffect } from "react";
import uuid from "uuid/v4";
import styled, { createGlobalStyle } from "styled-components";
import db from "./db";
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
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const unsubscribe = db
      .collection("todos")
      .orderBy("createdAt", "asc")
      .onSnapshot(snapshot => setTodos(snapshot.docs));
    return unsubscribe;
  }, []);

  function handleCreateTodo(text) {
    db.collection("todos")
      .doc(uuid())
      .set({ text, completed: false, deleted: false, createdAt: new Date() });
  }

  function completeTodo(todo) {
    db.collection("todos")
      .doc(todo.id)
      .update({ completed: true });
  }

  function deleteTodo(todo) {
    db.collection("todos")
      .doc(todo.id)
      .update({ deleted: true });
  }

  function handleUpdateText(todo, text) {
    db.collection("todos")
      .doc(todo.id)
      .update({ text });
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

  const pending = todos.filter(
    todo => !todo.data().completed && !todo.data().deleted
  );

  return (
    <Container>
      <GlobalStyle />
      You have {pending.length} todos left
      <Todos
        todos={pending}
        selectedIndex={selectedIndex}
        onComplete={completeTodo}
        onDelete={deleteTodo}
        onUpdateText={handleUpdateText}
      />
      <TodoForm onCreateTodo={handleCreateTodo} />
    </Container>
  );
}

export default App;
