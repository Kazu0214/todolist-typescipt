import React, { useState } from 'react';
import './App.css';

function App() {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");

  type Todo = {
    inputValue: string;
    id: number;
    checked: boolean;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const handolSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newtodo: Todo = {
      inputValue: inputValue,
      id: todos.length,
      checked: false,
    };
    setTodos([...todos, newtodo]);
    setInputValue(newtodo.inputValue);
  };

  const handleEdit = (id: number, inputValue: string) => {
    const newTodo = todos.map((todo: Todo) => {
      if (todo.id === id) {
        todo.inputValue = inputValue;
      }
      return todo;
    });
    setTodos(newTodo);
  }

  const handleChecked = (id: number, checked: boolean) => {
    const newTodo = todos.map((todo: Todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });
    setTodos(newTodo);
  }

  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  return (
    <div className="App">
      <div>
        <h2>Todo リスト</h2>
        <form onSubmit={(e) => handolSubmit(e)}>
          <input type="text" onChange={(e) => handleChange(e)} className="inputText" />
          <input type="submit" value="作成" className='submitButton' />
        </form>
        <ul className='todoList'>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input type="text" onChange={(e) => handleEdit(todo.id, e.target.value)} className="inputText" value={todo.inputValue} disabled={todo.checked} />
              <input type="checkbox" onChange={(e) => handleChecked(todo.id, todo.checked)} />
              <button onClick={(e) => handleDelete(todo.id)}>
                削
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
