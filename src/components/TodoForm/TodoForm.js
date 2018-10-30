import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  font-size: 16px;
`;

const Button = styled.button.attrs({ type: "submit" })`
  background: #f95959;
  color: #fff;
  border: none;
  font-size: 16px;
  font-weight: 600;
  padding: 8px 16px;
  margin-top: 8px;
  cursor: pointer;
`;

function TodoForm(props) {
  const [todoText, setTodoText] = useState("");

  function handleCreateTodo(evt) {
    evt.preventDefault();
    if (todoText.trim() === "") return;
    props.onCreateTodo(todoText);
    setTodoText("");
  }

  const inputEl = useRef(null);
  useEffect(() => {
    function handleKeyPress(evt) {
      if (evt.key !== "a" || evt.target !== document.body) return;
      inputEl.current.focus();
    }

    document.addEventListener("keyup", handleKeyPress);

    return () => document.removeEventListener("keyup", handleKeyPress);
  }, []);

  return (
    <form onSubmit={handleCreateTodo}>
      <Input
        value={todoText}
        onChange={e => setTodoText(e.currentTarget.value)}
        ref={inputEl}
      />
      <Button>Add</Button>
    </form>
  );
}

export default TodoForm;
