import React, { useState, useEffect } from "react";
import styled from "styled-components";
import EditTodo from "../EditTodo";

const ListItem = styled.li`
  list-style: none;
  ${p => p.completed && "text-decoration: line-through #facf5a;"};
  border-bottom: 1px solid #455d7a;
  border-left: 2px solid ${p => (p.selected ? "#f95959" : "transparent")};
  padding: 8px 16px;
`;

function Todo(props) {
  const { todo } = props;
  const [showEdit, setShowEdit] = useState(false);

  function onUpdate(text) {
    props.onUpdate(text);
    setShowEdit(false);
  }

  useEffect(
    () => {
      function handleKeyPress(evt) {
        if (evt.key !== "y" || evt.target !== document.body) return;
        props.onComplete();
      }
      if (props.selected) document.addEventListener("keyup", handleKeyPress);

      return () => document.removeEventListener("keyup", handleKeyPress);
    },
    [props.selected]
  );

  return (
    <ListItem
      key={todo.id}
      completed={todo.completed}
      selected={props.selected}
    >
      {showEdit ? (
        <EditTodo
          todo={todo}
          onUpdate={onUpdate}
          onCancel={() => setShowEdit(false)}
        />
      ) : (
        <span onClick={() => setShowEdit(true)}>{todo.text}</span>
      )}
    </ListItem>
  );
}

export default Todo;
