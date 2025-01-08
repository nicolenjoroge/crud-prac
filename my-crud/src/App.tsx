import React, { useState } from 'react';
import './App.css';
import { todoList } from './data/array.ts';
import AddItem from './components/AddItem.tsx';
import UpdateItem from './components/UpdateItem.tsx';
import DeleteItem from './components/DeleteItem.tsx';

export interface Todo {
  id: number,
  title: string,
  description: string,
  status: string,
  dueDate: string,
}

function App() {
  const [todo, setTodo] = useState<Todo[]>(todoList)

  const handleCreate = (newTodo: Omit<Todo, 'id'>) => {
    const newId = todo.length ? todo[todo.length - 1].id + 1 : 1
    setTodo([...todo, { ...newTodo, id: newId} ])
  }

  const handleUpdate = (id: number, updatedData: Partial<Todo>) => {
    setTodo(
      todo.map((todo) => (
        todo.id === id ? {...todo, ...updatedData } : todo
      ))
    )
  }

  const handleDelete = (id: number) => {
    setTodo(
      todo.filter((todo) => todo.id !== id)
    )
  }
  return (
    <div className="App">
      <h1>To do list</h1>
      <AddItem onCreate={handleCreate}/>
      <div>
        <ul>
      {todo.map((todo) => (
        <li key={todo.id}>
          <h2>{todo.title}</h2>
          <p>{todo.description}</p>
          <p>Status: {todo.status}</p>
          <p>Due Date: {todo.dueDate}</p>

          <UpdateItem todo={todo} onUpdate={handleUpdate}/> 

          <DeleteItem todoid={todo.id} onDelete={handleDelete}/>
        </li>
      ))}
      </ul>
      </div>
      
    </div>
  );
}

export default App;
