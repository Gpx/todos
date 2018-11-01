import React from "react";
import styled from "styled-components";
import Todo from "../Todo";

const List = styled.ol`
  padding-left: 0;
`;

function Todos(props) {
  const { todos } = props;

  if (todos.length === 0) {
    return <div>All done here</div>;
  }

  return (
    <List>
      {todos.map((todo, index) => (
        <Todo
          key={todo.id}
          todo={todo}
          selected={props.selectedIndex === index}
          onComplete={() => props.onComplete(todo)}
          onDelete={() => props.onDelete(todo)}
          onUpdate={text => props.onUpdateText(todo, text)}
        />
      ))}
    </List>
  );
}

export default Todos;
