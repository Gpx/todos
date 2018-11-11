import React, { useState, useEffect, useRef } from "react";
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
        if (evt.target !== document.body) return;
        if (evt.key === "y") props.onComplete();
        if (evt.key === "#") props.onDelete();
      }
      if (props.selected) document.addEventListener("keyup", handleKeyPress);

      return () => document.removeEventListener("keyup", handleKeyPress);
    },
    [props.selected]
  );

  const selfEl = useRef(null);
  useEffect(
    () => {
      if (!props.selected) return;
      selfEl.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest"
      });
    },
    [props.selected]
  );

  function parseText(text) {
    const tags = text.match(/#[^\s]+/gi);
    if (!tags) return text;

    const r = text.split(/\s/).map(
      (part, i) =>
        tags.includes(part) ? (
          <React.Fragment key={i}>
            <b>{part}</b>{" "}
          </React.Fragment>
        ) : (
          part + " "
        )
    );
    return r;
  }

  return (
    <ListItem
      key={todo.id}
      completed={todo.data().completed}
      selected={props.selected}
      ref={selfEl}
    >
      {showEdit ? (
        <EditTodo
          todo={todo}
          onUpdate={onUpdate}
          onCancel={() => setShowEdit(false)}
        />
      ) : (
        <span onClick={() => setShowEdit(true)}>
          {parseText(todo.data().text)}
        </span>
      )}
    </ListItem>
  );
}

export default Todo;
