import React, { useEffect, useState } from 'react';
import './App.css';
import AddDo from './components/AddDo.tsx';

export interface Todos {
  id: number;
  title: string;
}

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todos[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setisLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setisLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/todos`);
        const items = (await response.json()) as Todos[];
        setTodos(items);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setisLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleAdd = async (newItem: Todos) => {
    try {
      const res = await fetch(`${BASE_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
      });
      if (!res.ok) {
        console.log('Ngori!');
        return;
      }
      const addedItem = (await res.json()) as Todos;
      setTodos((prevTodos) => [...prevTodos, addedItem]);
    } catch (err: any) {
      console.log('Error occurred');
    }
  };

  return (
    <div className="App">
      <h1>HTTP Requests Json</h1>
      <AddDo onAdd={handleAdd} />
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.id}: {todo.title}
            </li>
          ))}
        </ul>
      )}
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
    </div>
  );
};

export default App;
