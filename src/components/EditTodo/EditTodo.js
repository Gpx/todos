import React, { useState } from "react";

function EditTodo(props) {
  const [text, setText] = useState(props.todo.data().text);

  function handleUpdate(evt) {
    evt.preventDefault();
    props.onUpdate(text);
  }

  return (
    <form onSubmit={handleUpdate}>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.currentTarget.value)}
        autoFocus
      />
      <button type="submit">Save</button>
      <button type="button" onClick={props.onCancel}>
        Cancel
      </button>
    </form>
  );
}

export default EditTodo;
