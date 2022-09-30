import React, { Fragment, useState } from "react";
import { ReactDOM } from "react";

type formElem = React.FormEvent<HTMLFormElement>;

interface Todo {
  text: string;
  complete: boolean;
}

function App() {
  const [value, setValue] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleSubmit = (e: formElem): void => {
    e.preventDefault();
    addTodo(value);
    setValue("");
  };

  const addTodo = (text: string): void => {
    const newTodos: Todo[] = [...todos, { text, complete: false }];
    setTodos(newTodos);
  };

  const completeTodo = (index: number): void => {
    const newTodos: Todo[] = [...todos];
    newTodos[index].complete = !newTodos[index].complete;
    setTodos(newTodos);
  };

  const removeTodo = (index: number): void => {
    const newTodos: Todo[] = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };
  return (
    <Fragment>
      <h1>Todo list</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
        <button type="submit">Add Todo</button>
      </form>

      <section>
        {todos.map((todo: Todo, index: number) => (
          <Fragment key={index}>
            <div
              style={{ textDecoration: todo.complete ? "line-through" : "" }}
            >
              {todo.text}
            </div>
            <button type="button" onClick={(): void => completeTodo(index)}>
              {" "}
              {todo.complete ? "Incomplete" : "Complete"}{" "}
            </button>
            <button type="button" onClick={(): void => removeTodo(index)}>
              &times;
            </button>
          </Fragment>
        ))}
      </section>
    </Fragment>
  );
}

export default App;
