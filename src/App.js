import React, { useState, useEffect } from "react";
import uuid from "uuid/v4";
import styled, { createGlobalStyle } from "styled-components";
import { throttle } from "lodash";
import db from "./db";
import Todos from "./components/Todos";
import TodoForm from "./components/TodoForm";
import BackgroundCourtesy from "./components/BackgroundCourtesy";

const UNSPLASH_KEY =
  "d5fc56aca800600ffae7a2cd04be7ee6bb1a7baee5967b578c4ac55112b0aa19";

const GlobalStyle = createGlobalStyle`
  body{
    background-color: ${p => p.color || "#455d7a"};
    background-image: url(${p => p.background});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    color: #fff;
  }
`;

const Container = styled.div`
  width: 40vw;
  margin: auto;
  background: rgba(35, 49, 66, 0.6);
  padding: 16px 32px;
`;

function App() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const unsubscribe = db
      .collection("todos")
      .where("deleted", "==", false)
      .where("completed", "==", false)
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
      const handleKeyPress = throttle(evt => {
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
      }, 300);
      document.addEventListener("keydown", handleKeyPress);

      return () => document.removeEventListener("keydown", handleKeyPress);
    },
    [selectedIndex, todos]
  );

  const [background, setBackground] = useState();
  useEffect(() => {
    async function fetchNewBackground() {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?client_id=${UNSPLASH_KEY}&query=wallpapers&featured=true`
      );
      const photo = await response.json();
      setBackground(photo);
      localStorage.setItem(
        "background",
        JSON.stringify({ date: Date.now(), photo })
      );
    }

    const storedBackground = localStorage.getItem("background");
    if (storedBackground) {
      const { date, photo } = JSON.parse(storedBackground);
      if (Date.now() > date + 24 * 60 * 60 * 1000) fetchNewBackground();
      else setBackground(photo);
    } else fetchNewBackground();
  }, []);

  return (
    <Container>
      <GlobalStyle
        background={background && background.urls.full}
        color={background && background.color}
      />
      <BackgroundCourtesy background={background} />
      You have {todos.length} todos left
      <Todos
        todos={todos}
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
